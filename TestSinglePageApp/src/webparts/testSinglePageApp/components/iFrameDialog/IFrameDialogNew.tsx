import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseDialog, IDialogConfiguration } from "@microsoft/sp-dialog";
import {
    SPHttpClient,
    SPHttpClientResponse
} from "@microsoft/sp-http";
import {
    DialogContent
} from "office-ui-fabric-react";
interface IIFrameDialogContentProps {
    close: () => void;
    url: string;
   iframeOnLoad?: (iframe: any) => void;
}
class IFrameDialogContent extends React.Component<IIFrameDialogContentProps,{} > {
    private _iframe: any;
    constructor(props: IIFrameDialogContentProps) {
        super(props);
    }
    public render(): JSX.Element {
        return <DialogContent
            title="Alert Me"
            onDismiss={this.props.close}
            showCloseButton={true}
        >
            <iframe ref={(iframe) => { this._iframe = iframe; }} onLoad={this._iframeOnLoad.bind(this)}
                style={{ width: "600px", height: "1000px" }} src={this.props.url} frameBorder={0}></iframe>
        </DialogContent>;
    }

    private _iframeOnLoad(): void {
        try { 
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
        } catch (err) {
            if (err.name !== "SecurityError") {
                throw err;
            }
        }
        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }
    }
}
export default class IFrameDialogNew extends BaseDialog {
    private url: string = "";
    constructor(url: string) {
        super();
        this.url = url;
    }
    public render(): void {
        window.addEventListener("CloseDialog", () => { this.close(); });
        ReactDOM.render(
            <IFrameDialogContent
                close={this.close}
                url={this.url}
            />, this.domElement);
    }
    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: false
        };
    }

    public testfun(): void{
        console.log("testfun")
    }
    protected onAfterClose(): void {
        super.onAfterClose();
        console.log("onAfterClose");
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}