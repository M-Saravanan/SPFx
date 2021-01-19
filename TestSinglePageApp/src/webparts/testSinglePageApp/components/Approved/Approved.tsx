import * as React from 'react';
import styles from '../TestSinglePageApp.module.scss';
import peoplepickerstyles from './SpfxPnpFilepicker.module.scss';
import { IApprovedProps } from './IApprovedProps';

import { ISpfxPnpFilepickerProps } from './ISpfxPnpFilepickerProps';
import { ISpfxPnpFilepickerState } from './ISpfxPnpFilepickerState';
import { sp } from "@pnp/sp";
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import ListForm from '../../../listForm/components/ListForm';
import { IFieldConfiguration } from '../../../listForm/components/IFieldConfiguration';

import * as jquery from 'jquery';
require('../SideNav/custommaster.css');
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export interface IReactSpfxState{    
  items:[    
        {    
          "Courses": "",   
          "Credit": "",   
          "Department":"",  
        }
    ];
    ApprovedItems:[];
    ImageURL: string;
    modalshow:boolean;
    itemid: number;
}    



export default class AppPage extends React.Component<IApprovedProps,IReactSpfxState> {
    public constructor(props: IApprovedProps, state: IReactSpfxState){    
        super(props);   
          
        this.state = {    
          items: [    
            {    
              "Courses": "",   
              "Credit": "",   
              "Department":"",  
               
            }  
          ],
          ApprovedItems:[],
          ImageURL: "https://via.placeholder.com/150",
          modalshow:false,
          itemid:0
        };    

        sp.setup({
          spfxContext: this.props.context
        });
      }
      public componentDidMount() {  
        this.LoadApprovedDocuments("");
        this.LoadScripts();
     }  

     public LoadScripts(){
         var curpg = this;
$('#txtsearch').on('keyup',function(){
    console.log("txtsearch",$('#txtsearch').val());
    var txt:string = $('#txtsearch').val().toLocaleString();
    curpg.LoadApprovedDocuments(txt);
})
     }
     private fetchDatafromSharePointList()  
  {  
    var reactHandler = this;    
      jquery.ajax({    
          url: `${this.props.siteurl}/_api/web/lists/getbytitle('CourseDetails')/items`,    
          type: "GET",    
          headers:{'Accept': 'application/json; odata=verbose;'},    
          success: function(resultData) {    
            /*resultData.d.results;*/    
            reactHandler.setState({    
              items: resultData.d.results    
            });    
          },    
          error : function(jqXHR, textStatus, errorThrown) {    
          }    
      });    
  }      
  private LoadApprovedDocuments(txval:string)  
  {  
    var filterval = "";
    filterval = "&$filter=startswith(ContractName ,'" + txval + "')";
    var resturl = `${this.props.siteurl}/_api/web/lists/getbytitle('Approved Documents')/items?$select=Id,FileLeafRef,ContractName,Contract_x0020_Classification/Title,Contract_x0020_Type/Title,Other_x0020_Party_x0020_Name/Title&$expand=Contract_x0020_Classification/Title,Contract_x0020_Type/Title,Other_x0020_Party_x0020_Name/Title`;
    if(txval != ""){
        resturl = resturl + filterval
    }
    console.log("resturl",resturl)
    var reactHandler = this;    
      jquery.ajax({    
          url: resturl,    
          type: "GET",    
          headers:{'Accept': 'application/json; odata=verbose;'},    
          success: function(resultData) {    
            /*resultData.d.results;*/    
            console.log("Approveddata",resultData.d.results)
            reactHandler.setState({    
                ApprovedItems: resultData.d.results    
            });    
          },    
          error : function(jqXHR, textStatus, errorThrown) {    
          }    
      });    
  }

  private formSubmitted(id: number) {
    console.log("formSubmitted");
    $("#closebtntmp").trigger("click");
    this.LoadApprovedDocuments("");
    
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

  public render(): React.ReactElement<IApprovedProps> {  
    const styles = {
        txtwidth: {
          width: "100%"
        } as React.CSSProperties,
        srchstr: {
            font:"bold 12px"
          } as React.CSSProperties,
      } 
      let Tempfields: IFieldConfiguration[];
    return (    
     <div className="container-fluid" >   
     <div className="panelclasstop AllContract">
         <p>Signed Contracts – Active Contracts</p>
     </div>
     <div className="row">
         <div className="panel panel-default panelfilterclass1" style={styles.txtwidth}>
             <table className="table">
                 <thead>
                     <tr>
                         <td>
                             Search
                         </td>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td>
                         <input id="txtsearch" type="search" className="form-control localizeplaceholder" placeholder="Contract Name" style={styles.srchstr}></input>
                         </td>
                     </tr>
                 </tbody>
             </table>
             
         </div>
     </div>
         <div className="row">
<div className="col-sm-12">
<div className="panel panel-default">
<div className="panel-heading panelhdr">
    <span className="panelhdr CustomForeColor localizehtml">Active Contracts</span>
    <div className="input-group-btn pull-right tpbtn">
    <FilePicker
          //label={'UPLOAD DOCUMENT'}
          buttonClassName="btn btn-default CustomBackColor CustomBorderColor newbtn"
          buttonLabel={'UPLOAD DOCUMENT'}
          //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
          //buttonIcon="FileImage"
          onSave={this.saveIntoSharePoint}
          //onChange={this.saveIntoSharePoint}
          context={this.props.context}
          hideLinkUploadTab={true}
          hideRecentTab={true}
          hideSiteFilesTab={true}
          hideOneDriveTab={true}
          hideWebSearchTab={true}
          hideStockImages={true}
          hideOrganisationalAssetTab={true}
        />
							
							
						</div>
</div>
<div className="table-responsive">
    <table className="table table-hover table-striped">
<thead className="tbalehdr">
<tr>
<td>Name</td>
    <td>Contract Name</td>
    <td>Contract Classification</td>
    <td>Contract Type</td>
    <td>Other Party Name</td>
</tr>
</thead>
<tbody className="tbodyclass">
{this.state.ApprovedItems.map(function(item,key){   
    return(
        <tr>
            <td>{item["FileLeafRef"]}</td>
            <td>{item["ContractName"]}</td>
            <td>{item["Contract_x0020_Classification"]["Title"]}</td>
            <td>{item["Contract_x0020_Type"]["Title"]}</td>
            <td>{item["Other_x0020_Party_x0020_Name"]["Title"]}</td>
        </tr>
    );
})}
</tbody>
    </table>
</div>
<div className="row">
                 <div className="col-sm-12">
                   <input type="button" value="click" id="divadd" className="hideclass" />
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
      <ListForm inDesignMode={false} spHttpClient={this.props.spHttpClient} title={"Active Contracts"} description={""} webUrl={this.props.siteurl} listUrl={"/sites/Contract-Spfx/Approved%20Documents"} formType={2} id={this.state.itemid} fields={Tempfields} showUnsupportedFields={false} onSubmitSucceeded={(id: number) => this.formSubmitted(id)} onUpdateFields={(fields: IFieldConfiguration[]) => this.updateField(fields)} context={this.props.context}/>
      </div>
      
    </div>
  </div>
</div>




                 
                 </div>
             
             </div>
</div>
</div>
         </div>
          
         <div className="hideclass">
        <img src={this.state.ImageURL} height={'150px'} width={'150px'}></img>
        <br></br>
        <br></br>
        
      </div>
             
       </div>    
 
 
   );    
 }    

 @autobind
  private async saveIntoSharePoint(file: IFilePickerResult) {
    let itemidtemp:number = 0;
    if (file.fileAbsoluteUrl == null) {
      file.downloadFileContent()
        .then(async r => {
          let fileresult = await sp.web.getFolderByServerRelativeUrl("/sites/Contract-Spfx/Approved%20Documents/").files.add(file.fileName, r, true);
          console.log("fileresult",fileresult,fileresult.data.ServerRelativeUrl)
          this.setState({ ImageURL: this.props.siteurl + "/" + fileresult.data.ServerRelativeUrl });
          let filedata = await sp.web.getFileByServerRelativeUrl(fileresult.data.ServerRelativeUrl).getItem();
          console.log("filedata",filedata, filedata["Id"])
          itemidtemp = Number(filedata["Id"]);
          this.setState({
itemid:itemidtemp
          });
          $('#divadd').trigger("click");
        });
    }
    else {
      this.setState({ ImageURL: file.fileAbsoluteUrl });
    }
  }
  }