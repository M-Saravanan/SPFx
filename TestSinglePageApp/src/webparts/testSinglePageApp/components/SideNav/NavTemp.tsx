import * as React from 'react';
import styles from '../../components/TestSinglePageApp.module.scss';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import masterstyle from './custommaster.module.scss';
import classNames from 'classnames'
require('./custommaster.css');
import "bootstrap/dist/css/bootstrap.min.css";
require('./master.js');
import * as bootstrap from "bootstrap";
require('../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class NavTemp extends React.Component<any> {
    public constructor(props){
        super(props);
        SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

    }
    public render(): React.ReactElement<any> {
        const roundClass = classNames('round', 'round-sm', 'rouncolor', 'CustomBackColor', 'btn-default')
        return (
            
            <div id="sideNavBox" className={masterstyle.sideNavBox}>
                <nav className="main-menu">
                    <div className="scrollbar">
                        <div className="settings">
<img className="logoimg" src={require("../Images/convergepoint-icon-white-no-background-large1.png")}></img>
<img className="logoimg1" src={require("../Images/ConvergePoint-Logo-No-Background-Small-All-White1.png")}></img>
                        </div>
                        <ul className="sidebar-nav">
                            <li>
                                <a className="mainlia" href="#/">
                                    <div className={roundClass}>
                                        <i className="glyphicon glyphicon-home"></i>
                                    </div>
                                    <span className="nav-text">Home</span>
                                </a>
                            </li>
                            <li>
                                <a className="mainlia" href="#/Approved">
                                    <div className={roundClass}>
                                        <i className="glyphicon glyphicon-open-file"></i>
                                    </div>
                                    <span className="nav-text">Active</span>
                                </a>
                            </li>
                            <li>
                                <a className="mainlia" href="#/Admin">
                                    <div className={roundClass}>
                                        <i className="glyphicon glyphicon-wrench"></i>
                                    </div>
                                    <span className="nav-text">Admin</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}