import * as React from 'react';
import styles from '../TestSinglePageApp.module.scss';
import FileViewer from 'react-file-viewer';

import { IHomeprops } from './IHomeprops';
import Iframe from 'react-iframe'

import * as jquery from 'jquery';
require('../SideNav/custommaster.css');
export interface IReactItems{    
  ApprovedItems:[];
  fileurl: string;
}  

export default class AppPage extends React.Component<IHomeprops,IReactItems> {
    
    public constructor(props: IHomeprops, state: IReactItems){    
        super(props);   
          
        this.state = {   
          ApprovedItems:[],
          fileurl: ""    
        };    
      }
      public componentDidMount() {  
          this.LoadApprovedDocuments("");
          
      }
      public LoadFile(){
          var thispage = this;
          //thispage.setState({fileurl: "https://convergepoint.sharepoint.com/sites/Contract-Spfx/Approved%20Documents/CM%20Apprv%20Test%201.pdf"});
          thispage.setState({fileurl: "https://convergepoint.sharepoint.com/sites/Contract-Spfx/_layouts/15/listform.aspx?PageType=9&ListId=%7BD378C3CC-D35C-4F66-8AD4-9AE55752C46F%7D&RootFolder=%2Fsites%2FContract-Spfx%2FLists%2FContract%20Classification&Source=https%3A%2F%2Fconvergepoint.sharepoint.com%2Fsites%2FContract-Spfx%2FLists%2FContract%2520Classification%2FAllItems.aspx&ContentTypeId=0x0100CBB2D2FAF7EF874F93967D882F17576D"});

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
    public render(): React.ReactElement<IHomeprops> {
        const thispage = this;
    return (
      <div className="container-fluid">
          <div className="panelclasstop AllContract">
         <p>Contract Management</p>
     </div>
<div className="row">
    <div className="col-sm-4">
    <div className="panel panel-default">
<div className="panel-heading panelhdr">
    <span className="panelhdr CustomForeColor localizehtml">Document List View</span>
</div>
<div className="table-responsive">
    <table className="table table-hover table-striped">
<thead className="tbalehdr">
<tr>
<td>Name</td>
    <td>Contract Name</td>
</tr>
</thead>
<tbody className="tbodyclass">
{this.state.ApprovedItems.map(function(item,key){   
    return(
        <tr>
            <td><a href="#" className="loadfile" onClick={() => thispage.LoadFile()}>{item["FileLeafRef"]}</a></td>
            <td>{item["ContractName"]}</td>
        </tr>
    );
})}
</tbody>
    </table>
</div>
</div>
    </div>
    <div className="col-sm-8">
    <Iframe url={this.state.fileurl}
        width="100%"
        height="100%x"
        id="myId"
        className="myClassname"
        position="relative"/>
    </div>
</div>
      </div>
    
    );
  }
}