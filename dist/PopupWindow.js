"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class PopupWindow {
    constructor(id, url, options = {}) {
        this.id = id;
        this.url = url;
        this.options = options;
    }
    open() {
        const { url, id, options } = this;
        this.window = window.open(url, id, (0, utils_1.toQuery)(options, ","));
    }
    close() {
        this.cancel();
        if (this.window) {
            this.window.close();
        }
    }
    poll() {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;
                    if (!popup || popup.closed !== false) {
                        this.close();
                        reject(new Error("The popup was closed"));
                        return;
                    }
                    if (popup.location.href === this.url ||
                        popup.location.pathname === "blank") {
                        return;
                    }
                    const params = (0, utils_1.toParams)(popup.location.search.replace(/^\?/, ""));
                    resolve(params);
                    this.close();
                }
                catch (error) {
                    // Ignore DOMException
                }
            }, 500);
        });
        return this.promise;
    }
    cancel() {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }
    then(...args) {
        return this.promise.then(...args);
    }
    catch(...args) {
        return this.promise.catch(...args);
    }
    static open(...args) {
        const popup = new this(...args);
        popup.open();
        popup.poll();
        return popup;
    }
}
exports.default = PopupWindow;
//# sourceMappingURL=PopupWindow.js.map