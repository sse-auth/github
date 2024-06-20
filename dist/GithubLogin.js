"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const PopupWindow_1 = __importDefault(require("./PopupWindow"));
const utils_1 = require("./utils");
class GitHubLogin extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onBtnClick = () => __awaiter(this, void 0, void 0, function* () {
            const { clientId, scope, redirectUri } = this.props;
            const search = (0, utils_1.toQuery)({
                client_id: clientId,
                scope,
                redirect_uri: redirectUri,
            });
            const popup = (this.popup = PopupWindow_1.default.open("github-oauth-authorize", `https://github.com/login/oauth/authorize?${search}`, { height: 1000, width: 600 }));
            this.onRequest();
            popup.then((data) => {
                if (!data.code) {
                    throw new Error("'code' not found");
                }
                this.onSuccess(data);
                // Get user details after successful login
                const userDetails = this.getUserDetails(data.code);
                if (this.props.onSuccess) {
                    this.props.onSuccess(userDetails);
                }
            }, (error) => {
                this.onFailure(error);
            });
            // try {
            //   const data = await popup;
            //   if (!data.code) {
            //     throw new Error("'code' not found");
            //   }
            //   this.onSuccess(data);
            //   // Get user details after successful login
            //   const userDetails = await this.getUserDetails(data.code);
            //   if (this.props.onSuccess) {
            //     this.props.onSuccess(userDetails);
            //   }
            // } catch (error) {
            //   // this.onFailure(error);
            // }
        });
        this.getUserDetails = (code) => __awaiter(this, void 0, void 0, function* () {
            const { clientId, redirectUri, clientSecret } = this.props;
            const tokenResponse = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code,
            }, { headers: { Accept: "application/json" } });
            const accessToken = tokenResponse.data.access_token;
            const userDetailsResponse = yield axios_1.default.get(`https://api.github.com/user`, {
                headers: { Authorization: `token ${accessToken}` },
            });
            return userDetailsResponse.data;
        });
        this.onRequest = () => {
            if (this.props.onRequest) {
                this.props.onRequest();
            }
        };
        this.onSuccess = (data) => {
            if (!data.code) {
                return this.onFailure(new Error("'code' not found"));
            }
            if (this.props.onSuccess) {
                this.props.onSuccess(data);
            }
        };
        this.onFailure = (error) => {
            if (this.props.onFailure) {
                this.props.onFailure(error);
            }
        };
    }
    render() {
        const { className, buttonText, children } = this.props;
        const attrs = { onClick: this.onBtnClick };
        if (className) {
            attrs.className = className;
        }
        return (0, jsx_runtime_1.jsx)("button", Object.assign({}, attrs, { children: children || buttonText }));
    }
}
GitHubLogin.defaultProps = {
    buttonText: "Sign in with GitHub",
    redirectUri: "",
    scope: "user:email",
    onRequest: () => { },
    onSuccess: () => { },
    onFailure: () => { },
};
exports.default = GitHubLogin;
//# sourceMappingURL=GithubLogin.js.map