/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root dir
 ectory of this source tree.
 */

const React = require('react');

// const Draggable = require('react-draggable');
const Spinner = require('react-spinkit');
const assign = require('object-assign');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');
require('./style/dialog.css');

const Dialog = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        style: React.PropTypes.object,
        backgroundStyle: React.PropTypes.object,
        className: React.PropTypes.string,
        maskLoading: React.PropTypes.bool,
        containerClassName: React.PropTypes.string,
        headerClassName: React.PropTypes.string,
        bodyClassName: React.PropTypes.string,
        footerClassName: React.PropTypes.string,
        onClickOut: React.PropTypes.func,
        modal: React.PropTypes.bool,
        start: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            style: {},
            backgroundStyle: {
                background: "rgba(0,0,0,.5)"
            },
            start: {x: 0, y: 0},
            className: "cmp-print-content",
            maskLoading: false,
            containerClassName: "",
            headerClassName: "cmp-print-header",
            bodyClassName: "cmp-print-body",
            footerClassName: "cmp-print-footer",
            modal: false
        };
    },
    renderLoading() {
        if (this.props.maskLoading) {
            return (<div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "visible",
                margin: "auto",
                verticalAlign: "center",
                left: "0",
                background: "rgba(255, 255, 255, 0.5)",
                zIndex: 2
            }}><div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -40%)"
            }}><Message msgId="loading" /><Spinner spinnerName="circle" noFadeIn/></div></div>);
        }
    },
    renderRole(role) {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role);
    },
    render() {
        const dialog = (<div className="cmp_print_container" start={this.props.start} >
            <div id={this.props.id} className="cmp_print_inner">
                <div className={this.props.bodyClassName}>
                    {this.renderLoading()}
                    {this.renderRole('body')}
                </div>
                {this.hasRole('footer') ? <div className={this.props.footerClassName}>
                    {this.renderRole('footer')}
                </div> : <span/>}
            </div>
        </div>);
        let containerStyle = assign({}, this.props.style, this.props.backgroundStyle);
        return this.props.modal ?
            (<div onClick={this.props.onClickOut} style={containerStyle} className={"fade in modal " + this.props.containerClassName} role="dialog">
            <div onClick={(evt)=> {evt.preventDefault(); evt.stopPropagation(); }} className="modal-dialog" style={{background: "transparent"}}>
                {dialog}
            </div></div>) :
            dialog;
    },
    hasRole(role) {
        return React.Children.toArray(this.props.children).filter((child) => child.props.role === role).length > 0;
    }
});

module.exports = Dialog;
