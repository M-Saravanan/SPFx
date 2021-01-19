import * as React from 'react';
import styles from './TestSinglePageApp.module.scss';

import { Stack, StackItem } from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter, PropsRoute } from 'react-router-dom'; 
import Home from './Home/Home';
import Approved from './Approved/Approved';
import Admin from './Admin/Admin';
import Navigation from '../components/SideNav/Navigation'; 
import { IApprovedProps } from './Approved/IApprovedProps';
import NavTemp from '../components/SideNav/NavTemp'; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import masterstyle from '../components/SideNav/custommaster.module.scss';

//import { IFrameDialog } from '../components/iFrameDialog';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import IFrameDialogNew from '../components/iFrameDialog/IFrameDialogNew';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { ITestSinglePageAppProps } from './ITestSinglePageAppProps';

import * as bootstrap from "bootstrap";
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../components/SideNav/custommaster.css');

let iframeUrl: string = 'https://convergepoint.sharepoint.com/sites/Contract-Spfx/_layouts/15/listform.aspx?PageType=8&ListId=%7BD378C3CC-D35C-4F66-8AD4-9AE55752C46F%7D&RootFolder=%2Fsites%2FContract-Spfx%2FLists%2FContract%20Classification&Source=https%3A%2F%2Fconvergepoint.sharepoint.com%2Fsites%2FContract-Spfx%2FLists%2FContract%2520Classification%2FAllItems.aspx&ContentTypeId=0x0100CC19BE8530A10747AA3DA9ECED9D6C65005B8AB85F0400A747A124B09CA4E8AB01';
let siteurl = "https://convergepoint.sharepoint.com/sites/Contract-Spfx";


  export interface IControlsTestState {
    iFrameDialogOpened?: boolean;
    iFrameDialogOpenedNew?: boolean;
  }

  /**
   * name
   */
  let pagecontext: any;
export default class TestSinglePageApp extends React.Component<ITestSinglePageAppProps, IControlsTestState> {
  constructor(prop: ITestSinglePageAppProps, state: IControlsTestState) {
    super(prop);
    this.state = {
      iFrameDialogOpened: false,
      iFrameDialogOpenedNew: false
    };
    
  }
  public render(): React.ReactElement<ITestSinglePageAppProps> {
    //let pagecontextinfo = this.context.pageContext;
    let BaseProps = { // make sure all required component's inputs/Props keys&types match
description: "", 
siteurl: ""
  }
    console.log("pagecontextinfo")
    return (  
      <HashRouter>  
        <div className={styles.testSinglePageApp}>
          <div className={styles.container}>
        <Stack horizontal gap={15}>   
          <NavTemp />
          <div id="contentBox" className={masterstyle.contentBox}>
          <StackItem grow={2}>  
            <Switch>  
              <Route path='/' exact={true} component={() => <Home  {...this.props} />} />  
              <Route path='/Approved' component={() => <Approved  {...this.props} />} />  
              <Route path='/Admin' component={() => <Admin {...this.props} />} />  
            </Switch>  
          </StackItem>  
          <div>
          <div className="ms-font-m hideclass">iframe dialog tester:
                <PrimaryButton
                  text="Open iframe Dialog"
                  onClick={() => { this.setState({ iFrameDialogOpened: true }); }} />
                <IFrameDialog 
    url={iframeUrl}
    iframeOnLoad={this._onIframeLoaded.bind(this)}
    hidden={!this.state.iFrameDialogOpened}
    onDismiss={this._onDialogDismiss.bind(this)}
    modalProps={{
        isBlocking: true,
        containerClassName: masterstyle.dialogContainer
    }}
    dialogContentProps={{
        type: DialogType.close,
        showCloseButton: true
    }}
    width={'600px'}
    height={'500px'}/>
              </div>

              
          </div>
          </div>
         
        </Stack>  
        </div>
        </div>
        
      </HashRouter>  
    );  
  }



  public _onIframeLoaded(iframe): void {
    console.log("_iframeOnLoad",iframe,iframe.contentWindow.location.href)
    let keepOpen = iframe.contentWindow.location.href.indexOf('Form.aspx') > 0;
    let keepOpen2 = iframe.contentWindow.location.href.indexOf('form.aspx') > 0;
        if (!keepOpen && !keepOpen2) {
          this._onDialogDismiss(null);
        }
}

public _onDialogDismiss(parval): void {
  console.log("_onDialogDismiss",parval)

  this.setState({ iFrameDialogOpened: false });
}
}
