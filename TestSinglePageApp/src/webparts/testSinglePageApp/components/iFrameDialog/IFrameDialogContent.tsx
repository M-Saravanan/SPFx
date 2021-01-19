import * as React from "react";
import * as ReactDOM from "react-dom";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { BaseDialog, IDialogConfiguration } from "@microsoft/sp-dialog";
import {
    SPHttpClient,
    SPHttpClientResponse
} from "@microsoft/sp-http";
import {
    DialogContent
} from "office-ui-fabric-react";

export interface IIFrameDialogContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    close: () => void;
    url: string;
    iframeOnLoad?: (iframe: any) => void;
}

export interface IIFrameDialogContentState {
    isContentVisible?: boolean;
}

/**
 * IFrame Dialog content
 */
export class IFrameDialogContent extends React.Component<IIFrameDialogContentProps, IIFrameDialogContentState> {
    private _iframe: any;

    constructor(props: IIFrameDialogContentProps) {
        super(props);

        this.state = {
            isContentVisible: false
        };
    }

    public render(): JSX.Element {
        return (<div>
            <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} onLoad={this._iframeOnLoad.bind(this)} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} {...this.props} />
            {!this.state.isContentVisible &&
                <div>
                    <Spinner size={SpinnerSize.large} />
                </div>}
        </div>);
    }

    private _iframeOnLoad(): void {
        try { // for cross origin requests we can have issues with accessing frameElement
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
            this._iframe.contentWindow.frameElement.commitPopUp = this.props.close;
            // SP.UI.Dialog has misspelling of commitPopUp
            this._iframe.contentWindow.frameElement.commitPopup = this.props.close;
        }
        catch (err) {
            if (err.name !== 'SecurityError') {
                throw err;
            }
        }


        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }

        this.setState({
            isContentVisible: true
        });
    }

    private _close():void{

    }

    public testfun(): void{
        console.log("testfun")
    }
}



export default class IFrameDialog extends BaseDialog {
    private url: string = "";
    constructor(url: string) {
        super();
        this.url = url;
    }
    public render(): void {
        window.addEventListener('message', function (event) {

console.log("received: " + event.data);
if (event.data === "closeDialog") {
//window.frameElement.cancelPopUp();
console.log("closeDialog 4")
}
});
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
    protected onAfterClose(): void {
        console.log("onAfterClose");
        super.onAfterClose();
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}