// VRCTools docs - progressive enhancements. Everything here is optional; the site is fully readable without JS.
(function () {
    "use strict";

    const $ = function (sel, root) {
        return (root || document).querySelector(sel);
    };
    const $$ = function (sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    };

    // ---- theme --------------------------------------------------------------------------------------------------------
    function currentTheme() {
        const explicit = document.documentElement.getAttribute("data-theme");
        if (explicit) return explicit;
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    $$("[data-theme-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const next = currentTheme() === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", next);
            try {
                localStorage.setItem("vrct-theme", next);
            } catch (e) {
            }
        });
    });

    // ---- mobile navigation --------------------------------------------------------------------------------------------
    $$("[data-nav-toggle]").forEach(function (el) {
        el.addEventListener("click", function () {
            const open = document.body.classList.toggle("nav-open");
            $$("button[data-nav-toggle]").forEach(function (b) {
                b.setAttribute("aria-expanded", String(open));
            });
        });
    });

    const current = $(".sidebar [aria-current='page']");
    if (current && current.scrollIntoView) current.scrollIntoView({block: "center"});

    const body = $(".doc-body");

    // ---- tables: wrap for horizontal scrolling ------------------------------------------------------------------------
    if (body) {
        $$("table", body).forEach(function (table) {
            if (table.parentElement.classList.contains("table-wrap")) return;
            const wrap = document.createElement("div");
            wrap.className = "table-wrap";
            table.parentNode.insertBefore(wrap, table);
            wrap.appendChild(table);
        });
    }

    // ---- code blocks: language label + copy button --------------------------------------------------------------------
    $$("div.highlighter-rouge, figure.highlight").forEach(function (block) {
        if (block.closest(".diagram") || block.parentElement.closest("div.highlighter-rouge")) return;
        const match = block.className.match(/language-([\w-]+)/);
        let lang = match ? match[1] : "";
        if (lang === "plaintext" || lang === "text") lang = "";

        const bar = document.createElement("div");
        bar.className = "code-bar";
        bar.innerHTML = '<span><span class="dots"><i></i><i></i><i></i></span>' + (lang || "") + "</span>";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = "copy";
        btn.addEventListener("click", function () {
            var code = $("pre code", block) || $("pre", block);
            var text = code ? code.innerText : "";
            var done = function () {
                btn.textContent = "copied";
                btn.classList.add("copied");
                setTimeout(function () {
                    btn.textContent = "copy";
                    btn.classList.remove("copied");
                }, 1600);
            };
            if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {
            });
        });
        bar.appendChild(btn);
        block.insertBefore(bar, block.firstChild);
    });

    // ---- heading anchors & table of contents --------------------------------------------------------------------------
    if (body) {
        const headings = $$("h2[id], h3[id]", body);
        headings.forEach(function (h) {
            var a = document.createElement("a");
            a.className = "anchor";
            a.href = "#" + h.id;
            a.setAttribute("aria-label", "Link to this section");
            a.textContent = "#";
            h.appendChild(a);
        });

        const toc = $("[data-toc]");
        const list = $("[data-toc-list]");
        if (toc && list && headings.length >= 2) {
            headings.forEach(function (h) {
                var li = document.createElement("li");
                li.className = "toc-" + h.tagName.toLowerCase();
                var a = document.createElement("a");
                a.href = "#" + h.id;
                a.textContent = h.firstChild ? h.firstChild.textContent.trim() : h.textContent;
                li.appendChild(a);
                list.appendChild(li);
            });
            toc.hidden = false;

            if ("IntersectionObserver" in window) {
                var links = $$("a", list);
                var setActive = function (id) {
                    links.forEach(function (l) {
                        l.classList.toggle("active", l.getAttribute("href") === "#" + id);
                    });
                };
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (e) {
                        if (e.isIntersecting) setActive(e.target.id);
                    });
                }, {rootMargin: "-70px 0px -70% 0px"});
                headings.forEach(function (h) {
                    observer.observe(h);
                });
            }
        }
    }

    // ---- search -------------------------------------------------------------------------------------------------------
    const modal = $("[data-search-modal]");
    const input = $("[data-search-input]");
    const results = $("[data-search-results]");
    let index = null;
    let loading = null;
    let active = -1;

    function loadIndex() {
        if (index) return Promise.resolve(index);
        if (!loading) {
            loading = fetch(window.VRCT.searchIndex)
                .then(function (r) {
                    return r.json();
                })
                .then(function (docs) {
                    index = docs.map(function (d) {
                        d._title = d.title.toLowerCase();
                        d._body = (d.content || "").toLowerCase();
                        d._extra = ((d.section || "") + " " + (d.keywords || "")).toLowerCase();
                        return d;
                    });
                    return index;
                });
        }
        return loading;
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, function (c) {
            return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c];
        });
    }

    function highlight(text, terms) {
        var out = escapeHtml(text);
        terms.forEach(function (t) {
            if (!t) return;
            const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
            out = out.replace(re, "<mark>$1</mark>");
        });
        return out;
    }

    function snippet(doc, terms) {
        const body = doc.content || "";
        let pos = -1;
        for (let i = 0; i < terms.length && pos < 0; i++) pos = doc._body.indexOf(terms[i]);
        if (pos < 0) return body.slice(0, 140);
        const start = Math.max(0, pos - 50);
        return (start > 0 ? "…" : "") + body.slice(start, start + 160) + "…";
    }

    function search(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
            results.innerHTML = "";
            active = -1;
            return;
        }
        const terms = q.split(/\s+/).filter(Boolean);
        const scored = [];
        index.forEach(function (d) {
            let score = 0;
            for (let i = 0; i < terms.length; i++) {
                const t = terms[i];
                const inTitle = d._title.indexOf(t) >= 0;
                const inExtra = d._extra.indexOf(t) >= 0;
                const inBody = d._body.indexOf(t) >= 0;
                if (!inTitle && !inExtra && !inBody) return; // every term must match somewhere
                if (inTitle) score += d._title === t ? 30 : d._title.indexOf(t) === 0 ? 15 : 10;
                if (inExtra) score += 4;
                if (inBody) score += Math.min(5, d._body.split(t).length - 1);
            }
            scored.push({doc: d, score: score});
        });
        scored.sort(function (a, b) {
            return b.score - a.score;
        });
        const top = scored.slice(0, 12);
        if (!top.length) {
            results.innerHTML = '<li class="r-empty">grep: no matches for "' + escapeHtml(query) + '"</li>';
            active = -1;
            return;
        }
        results.innerHTML = top.map(function (r) {
            const d = r.doc;
            return '<li><a href="' + d.url + '">' +
                '<div class="r-path">' + escapeHtml(d.section || "") + "</div>" +
                '<div class="r-title">' + highlight(d.title, terms) + "</div>" +
                '<div class="r-snippet">' + highlight(snippet(d, terms), terms) + "</div></a></li>";
        }).join("");
        setActiveResult(0);
    }

    function setActiveResult(i) {
        const items = $$("li", results).filter(function (li) {
            return !li.classList.contains("r-empty");
        });
        if (!items.length) {
            active = -1;
            return;
        }
        active = (i + items.length) % items.length;
        items.forEach(function (li, n) {
            li.classList.toggle("active", n === active);
        });
        items[active].scrollIntoView({block: "nearest"});
    }

    function openSearch() {
        if (!modal) return;
        modal.hidden = false;
        document.body.classList.add("search-open");
        input.focus();
        input.select();
        loadIndex().then(function () {
            search(input.value);
        });
    }

    function closeSearch() {
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove("search-open");
    }

    if (modal) {
        $$("[data-search-open]").forEach(function (b) {
            b.addEventListener("click", openSearch);
        });
        $$("[data-search-close]").forEach(function (b) {
            b.addEventListener("click", closeSearch);
        });
        input.addEventListener("input", function () {
            loadIndex().then(function () {
                search(input.value);
            });
        });
        input.addEventListener("keydown", function (e) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveResult(active + 1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveResult(active - 1);
            } else if (e.key === "Enter") {
                const link = $("li.active a", results);
                if (link) {
                    e.preventDefault();
                    window.location.href = link.href;
                }
            }
        });

        document.addEventListener("keydown", function (e) {
            const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
            if (e.key === "Escape" && !modal.hidden) {
                closeSearch();
                return;
            }
            if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
                e.preventDefault();
                openSearch();
            }
        });
    }
})();
