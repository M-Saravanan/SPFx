import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TestSinglePageAppWebPartStrings';
import TestSinglePageApp from './components/TestSinglePageApp';
import { ITestSinglePageAppProps } from './components/ITestSinglePageAppProps';

import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ITestSinglePageAppWebPartProps {
  description: string;  
  siteurl: string;
  spHttpClient: SPHttpClient;
    context: WebPartContext;
}
 
export default class TestSinglePageAppWebPart extends BaseClientSideWebPart<ITestSinglePageAppWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITestSinglePageAppProps> = React.createElement(
      TestSinglePageApp,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
    context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
