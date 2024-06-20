import { Component, ReactNode } from "react";
interface GitHubLoginProps {
    buttonText?: string;
    children?: ReactNode;
    className?: string;
    clientId: string;
    clientSecret: string;
    onRequest?: () => void;
    onSuccess?: (data: any) => void;
    onFailure?: (error: Error) => void;
    redirectUri: string;
    scope: string;
}
interface GitHubLoginState {
}
declare class GitHubLogin extends Component<GitHubLoginProps, GitHubLoginState> {
    static defaultProps: {
        buttonText: string;
        redirectUri: string;
        scope: string;
        onRequest: () => void;
        onSuccess: () => void;
        onFailure: () => void;
    };
    popup: any;
    onBtnClick: () => Promise<void>;
    getUserDetails: (code: string) => Promise<any>;
    onRequest: () => void;
    onSuccess: (data: any) => void;
    onFailure: (error: Error) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default GitHubLogin;
//# sourceMappingURL=GithubLogin.d.ts.map