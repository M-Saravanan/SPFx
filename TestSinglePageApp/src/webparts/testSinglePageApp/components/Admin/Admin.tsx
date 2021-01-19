import * as React from 'react';

import styles from '../TestSinglePageApp.module.scss';
import { IAdminProps } from './IAdminProps';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';

import * as jquery from 'jquery';
require('../SideNav/custommaster.css');
export interface IReactItems{    
  ContractClassItems:[];
    ContractTypeItems:[];
    OtherPartyItems:[];
    iFrameDialogOpened?: boolean;
    curlist: string;
    modalshow: boolean;
    listurl: string;
    formtype: number;
    itemid: number;
    formtitle: string;
}    

import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
/*import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import { useBoolean, useId } from '@uifabric/react-hooks';
import {  
    DialogFooter,
    DialogContent,
    Dialog,
    getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  DefaultButton,
  Modal,
  IDragOptions,
  IconButton,
  IIconProps,
    } from 'office-ui-fabric-react';*/

//List Form Webpart Imports
import { DisplayMode, Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import {
  IPropertyPaneConfiguration, PropertyPaneDropdown,
  PropertyPaneTextField, PropertyPaneToggle, IPropertyPaneField
} from "@microsoft/sp-property-pane";
import { initializeIcons } from '@uifabric/icons';

import * as strings from 'ListFormWebPartStrings';
import ListForm from '../../../listForm/components/ListForm';
import { IListFormProps } from '../../../listForm/components/IListFormProps';
import { IListFormWebPartProps } from '../../../listForm/IListFormWebPartProps';
import { IFieldConfiguration } from '../../../listForm/components/IFieldConfiguration';

import { PropertyPaneAsyncDropdown } from '../../../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import ConfigureWebPart from '../../../../common/components/ConfigureWebPart';
import { update, get } from '@microsoft/sp-lodash-subset';

import { ListService } from '../../../../common/services/ListService';
import { ControlMode } from '../../../../common/datatypes/ControlMode';

////


import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';
//import {Modal,Button} from 'react-bootstrap';

import Modal from 'react-bootstrap-modal';

//import Button from 'react-bootstrap/Button';

//import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

//import ModalBody from "react-bootstrap/ModalBody";
//import ModalHeader from "react-bootstrap/ModalHeader";
//import ModalFooter from "react-bootstrap/ModalFooter";
//import ModalTitle from "react-bootstrap/ModalTitle";

/*import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { useBoolean } from '@uifabric/react-hooks';*/

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

//var Modal = ReactBootstrap.Modal;
let formurl: string = "";




export default class AppPage extends React.Component<IAdminProps,IReactItems> {
    
    public constructor(props: IAdminProps, state: IReactItems){    
        super(props);   
          
        this.state = {    
            ContractClassItems: [],
            ContractTypeItems:[],
            OtherPartyItems:[],
            iFrameDialogOpened: false,
            curlist: "",
            modalshow: false,
            listurl: "/sites/Contract-Spfx/Lists/Contract Classification",
    formtype: 3,
    itemid: 0,
    formtitle: "Form"
        };    
      }
      public componentDidMount() {  
        this.LoadContractClass();
        this.LoadContractType();
        this.LoadOtherParty();
     }  

     

     
  private LoadContractClass()  
  {  
    var reactHandler = this;    
      jquery.ajax({    
          url: `${this.props.siteurl}/_api/web/lists/getbytitle('Contract Classification')/items?$select=Id,Title,Permission/Title&$expand=Permission/Title`,    
          type: "GET",    
          headers:{'Accept': 'application/json; odata=verbose;'},    
          success: function(resultData) {    
            /*resultData.d.results;*/    
            console.log("ContractClassItems",resultData.d.results)
            reactHandler.setState({    
                ContractClassItems: resultData.d.results    
            });    
          },    
          error : function(jqXHR, textStatus, errorThrown) {    
          }    
      });    
  }

  private LoadContractType()  
  {  
    var reactHandler = this;    
      jquery.ajax({    
          url: `${this.props.siteurl}/_api/web/lists/getbytitle('Contract Type')/items?$select=Id,Title,Contract_x0020_Specialist/Title&$expand=Contract_x0020_Specialist/Title`,    
          type: "GET",    
          headers:{'Accept': 'application/json; odata=verbose;'},    
          success: function(resultData) {    
            /*resultData.d.results;*/    
            console.log("ContractTypeItems",resultData.d.results)
            reactHandler.setState({    
                ContractTypeItems: resultData.d.results    
            });    
          },    
          error : function(jqXHR, textStatus, errorThrown) {    
          }    
      });    
  }
  private LoadOtherParty()  
  {  
    var reactHandler = this;    
      jquery.ajax({    
          url: `${this.props.siteurl}/_api/web/lists/getbytitle('Other Party')/items?$select=Id,Title,City`,    
          type: "GET",    
          headers:{'Accept': 'application/json; odata=verbose;'},    
          success: function(resultData) {    
            /*resultData.d.results;*/    
            console.log("OtherPartyItems",resultData.d.results)
            reactHandler.setState({    
                OtherPartyItems: resultData.d.results    
            });    
          },    
          error : function(jqXHR, textStatus, errorThrown) {    
          }    
      });    
  }
  public ParseUser(udata): string{
      let retval ="TestUser";
return retval;

  }

  

  /**
   * name
   */
  public newform(curpage:any, lstname:string) {
   
    formurl = `${this.props.siteurl}/_layouts/15/listform.aspx?PageType=8&ListId=%7BD378C3CC-D35C-4F66-8AD4-9AE55752C46F%7D&RootFolder=%2Fsites%2FContract-Spfx%2FLists%2FContract%20Classification&Source=https%3A%2F%2Fconvergepoint.sharepoint.com%2Fsites%2FContract-Spfx%2FLists%2FContract%2520Classification%2FAllItems.aspx&ContentTypeId=0x0100CBB2D2FAF7EF874F93967D882F17576D`;
    //curpage.setState({ iFrameDialogOpened: true, curlist: "Contract Class" });
  // $(".formmodal").modal("show");
    //setIsOpen(true);
    //curpage.showModal();
   // curpage.handleShow();
   if(lstname == "class"){
this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Classification",
formtype: 3,
itemid: 0,
formtitle: "Contract Classification"});
   }else if(lstname == "other"){
    this.setState({listurl: "/sites/Contract-Spfx/Lists/Other Party",
    formtype: 3,
    itemid: 0,
    formtitle: "Other Party"});
       }
       else if(lstname == "type"){
        this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Type",
        formtype: 3,
        itemid: 0,
        formtitle: "Contract Type"});
           }
   
  }

  
  public editform(curpage:any, itemid:string, lstname:string) {
      let curid = itemid;
    formurl = `${this.props.siteurl}/_layouts/15/listform.aspx?PageType=6&Id=${curid}&ListId=%7BD378C3CC-D35C-4F66-8AD4-9AE55752C46F%7D&RootFolder=%2Fsites%2FContract-Spfx%2FLists%2FContract%20Classification&Source=https%3A%2F%2Fconvergepoint.sharepoint.com%2Fsites%2FContract-Spfx%2FLists%2FContract%2520Classification%2FAllItems.aspx&ContentTypeId=0x0100CBB2D2FAF7EF874F93967D882F17576D`;
    curpage.setState({ iFrameDialogOpened: true, curlist: "Contract Class" });
    if(lstname == "class"){
        this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Classification",
        formtype: 2,
        itemid: Number(itemid),
        formtitle: "Contract Classification"});
           }else if(lstname == "other"){
            this.setState({listurl: "/sites/Contract-Spfx/Lists/Other Party",
            formtype: 2,
            itemid: Number(itemid),
            formtitle: "Other Party"});
               }else if(lstname == "type"){
                this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Type",
                formtype: 2,
                itemid: Number(itemid),
                formtitle: "Contract Type"});
                   }

               $('#saveebtntmp').trigger("click");
  }

  public viewform(curpage:any, itemid:string, lstname:string) {
    let curid = itemid;
  formurl = `${this.props.siteurl}/_layouts/15/listform.aspx?PageType=6&Id=${curid}&ListId=%7BD378C3CC-D35C-4F66-8AD4-9AE55752C46F%7D&RootFolder=%2Fsites%2FContract-Spfx%2FLists%2FContract%20Classification&Source=https%3A%2F%2Fconvergepoint.sharepoint.com%2Fsites%2FContract-Spfx%2FLists%2FContract%2520Classification%2FAllItems.aspx&ContentTypeId=0x0100CBB2D2FAF7EF874F93967D882F17576D`;
  curpage.setState({ iFrameDialogOpened: true, curlist: "Contract Class" });
  if(lstname == "class"){
      this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Classification",
      formtype: 1,
      itemid: Number(itemid),
      formtitle: "Contract Classification"});
         }else if(lstname == "other"){
          this.setState({listurl: "/sites/Contract-Spfx/Lists/Other Party",
          formtype: 1,
          itemid: Number(itemid),
          formtitle: "Other Party"});
             }else if(lstname == "type"){
                this.setState({listurl: "/sites/Contract-Spfx/Lists/Contract Type",
                formtype: 1,
                itemid: Number(itemid),
                formtitle: "Contract Type"});
                   }

             $('#saveebtntmp').trigger("click");
}
  private formSubmitted(id: number) {
    console.log("formSubmitted");
    $("#closebtntmp").trigger("click");
    if(this.state.formtitle == "Contract Classification"){
        this.LoadContractClass();
    }
    else if(this.state.formtitle == "Other Party"){
        this.LoadOtherParty();
    }
    else if(this.state.formtitle == "Contract Type"){
        this.LoadContractType();
    }
    
  }

  private updateField(fields: IFieldConfiguration[]): any {
    console.log("updateField");
  }
/**
 * name
 */
public modalclose(): any {
    
}


public handleShow(): void{
    this.setState({modalshow:true});
}

public handleClose(): void{
    this.setState({modalshow:false});
}
public binduser = (userany:any) => {
let retval:string = "";
try{
    retval = userany["results"][0]["Title"];
}
catch(e){
    retval = "";
}
return retval;
}
  public render(): React.ReactElement<IAdminProps> {  
    
        const thispage = this;
        let Tempfields: IFieldConfiguration[];
    return (    
     <div className="container-fluid" >   
         <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading panelhdr">
    <span className="panelhdr CustomForeColor localizehtml">Contract Classification</span>
    <div className="tpbtn input-group-btn pull-right" id="divadd" onClick={() => this.newform(thispage,"class")}>
<button type="button" className="btn btn-default CustomBackColor CustomBorderColor newbtn">ADD NEW</button>
<button type="button" className="btn btn-default newbtnsymbol">
    <span className="glyphicon glyphicon-plus"></span>
</button>

    </div>
</div>
<div className="table-responsive">
    <table className="table table-hover table-striped">
<thead className="tbalehdr">
<tr>
    <td></td>
    <td></td>
    <td>Contract Classification</td>
    <td>Permission</td>
</tr>
</thead>
<tbody className="tbodyclass">
{this.state.ContractClassItems.map(function(item,key){   
    return(
        <tr>
            <td>
            <span className="glyphicon glyphicon-edit curpos" onClick={() => thispage.editform(thispage, item["Id"], "class")}></span>
            </td>
            <td>
            <span className="glyphicon glyphicon-list-alt curpos" onClick={() => thispage.viewform(thispage, item["Id"], "class")}></span>
            </td>
            <td>{item["Title"]}</td>
            <td>{item["Permission"]["Title"]}</td>
        </tr>
    );
})}
</tbody>
    </table>
</div>
</div>
</div>

         </div>
          
         <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading panelhdr">
    <span className="panelhdr CustomForeColor localizehtml">Contract Type</span>
    <div className="tpbtn input-group-btn pull-right" id="divadd" onClick={() => this.newform(thispage,"type")}>
<button type="button" className="btn btn-default CustomBackColor CustomBorderColor newbtn">ADD NEW</button>
<button type="button" className="btn btn-default newbtnsymbol">
    <span className="glyphicon glyphicon-plus"></span>
</button>

    </div>
</div>
<div className="table-responsive">
    <table className="table table-hover table-striped">
<thead className="tbalehdr">
<tr>
    <td></td>
    <td></td>
    <td>Contract Type</td>
    <td>Contract Specialist</td>
</tr>
</thead>
<tbody className="tbodyclass">
{this.state.ContractTypeItems.map(function(item,key){   
    return(
        
        <tr>
            <td>
            <span className="glyphicon glyphicon-edit curpos" onClick={() => thispage.editform(thispage, item["Id"], "type")}></span>
            </td>
            <td>
            <span className="glyphicon glyphicon-list-alt curpos" onClick={() => thispage.viewform(thispage, item["Id"], "type")}></span>
            </td>
            <td>{item["Title"]}</td>
            <td>{thispage.binduser(item["Contract_x0020_Specialist"])}</td>
        </tr>
    );
})}
</tbody>
    </table>
</div>
</div>
</div>
         </div>

         <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading panelhdr">
    <span className="panelhdr CustomForeColor localizehtml">Other Party</span>
    <div className="tpbtn input-group-btn pull-right" id="divaddother" onClick={() => this.newform(thispage,"other")}>
<button type="button" className="btn btn-default CustomBackColor CustomBorderColor newbtn">ADD NEW</button>
<button type="button" className="btn btn-default newbtnsymbol">
    <span className="glyphicon glyphicon-plus"></span>
</button>

    </div>
</div>
<div className="table-responsive">
    <table className="table table-hover table-striped">
<thead className="tbalehdr">
<tr>
    <td></td>
    <td>Other Party</td>
    <td>City</td>
</tr>
</thead>
<tbody className="tbodyclass">
{this.state.OtherPartyItems.map(function(item,key){   
    return(
        <tr>
            <td>
            <span className="glyphicon glyphicon-edit curpos" onClick={() => thispage.editform(thispage, item["Id"], "other")}></span>
            </td>
            <td>
            <span className="glyphicon glyphicon-list-alt curpos" onClick={() => thispage.viewform(thispage, item["Id"], "other")}></span>
            </td>
            <td>{item["Title"]}</td>
            <td>{item["City"]}</td>
        </tr>
    );
})}
</tbody>
    </table>
</div>
</div>
</div>
         </div>
        
             <div className="row">
                 <div className="col-sm-12">
                 <input type="button" id="closebtntmp" className="hideclass" />
                 <input type="button" id="saveebtntmp" className="hideclass" />
                 <div className="modal formmodal" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header paddzero">
        
        <button type="button" className="close padrght" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <ListForm inDesignMode={false} spHttpClient={this.props.spHttpClient} title={this.state.formtitle} description={""} webUrl={this.props.siteurl} listUrl={this.state.listurl} formType={this.state.formtype} id={this.state.itemid} fields={Tempfields} showUnsupportedFields={false} onSubmitSucceeded={(id: number) => this.formSubmitted(id)} onUpdateFields={(fields: IFieldConfiguration[]) => this.updateField(fields)} context={this.props.context}/>
      </div>
      
    </div>
  </div>
</div>




                 
                 </div>
             
             </div>
       </div>    
 
 
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
let chkval = this.state.curlist;
if(chkval == "Contract Class"){
this.LoadContractClass();
}
  this.setState({ iFrameDialogOpened: false, curlist: "" });
}
  }
  

  