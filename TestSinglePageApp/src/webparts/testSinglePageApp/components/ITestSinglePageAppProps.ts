import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ITestSinglePageAppProps {
  description: string;
  siteurl: string;  
  spHttpClient: SPHttpClient;
    context: WebPartContext;
}
