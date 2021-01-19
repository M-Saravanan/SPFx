import * as React from 'react';
import styles from '../../components/TestSinglePageApp.module.scss';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export default class Navigation extends React.Component<any> {
  public render(): React.ReactElement<any> {
    return (
      <div>
        <Nav
          expandButtonAriaLabel="Expand or collapse"
          ariaLabel="Nav basic example"
          styles={{
            link: {
              background: "#00ACC1",
              color: "#fff",
            },
            root: {
              background: "#00ACC1",
              width: 208,
              height: "auto",
              boxSizing: 'border-box',
              border: '1px solid #eee',
              overflowY: 'auto'
            }

          }}
          groups={
            [
              {
                links: [
                  {
                    iconClassName: styles.button,
                    name: 'Home',
                    url: '#/',
                    key: 'key2',
                    isExpanded: true,

                  },
                  {
                    name: 'Approved',
                    url: '#/Approved',
                    key: 'key3',
                    isExpanded: true,
                  },
                  {
                    name: 'Admin',
                    url: '#/Admin',
                    key: 'key4',
                  }
                ]
              }
            ]}
        />
      </div>
    );
  }
}
