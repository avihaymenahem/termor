import React, { PureComponent } from 'react';
import { Terminal as XTerminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

const os = require('os');
const pty = require("node-pty");

const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

export default class Terminal extends PureComponent {
    containerRef = null;
    xterm = null;

    constructor(props) {
        super(props);
        
        XTerminal.applyAddon(fit);
        this.xterm = new XTerminal({
            cursorBlink: true,
            disableStdin: false
        });

    }

    write(data) {
        this.xterm.write(data);
    }

    writeLine(data) {
        this.xterm.writeln(data);
    }

    componentDidMount() {
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-256color',
            cwd: process.cwd(),
            env: process.env
        });

        this.xterm.open(this.containerRef);
        //this.xterm.fit();

        this.xterm.on('data', (data) => {
            ptyProcess.write(data);
        });

        this.xterm.on('paste', (data, ev) => {
            this.write(data);
        });

        ptyProcess.on('data', (data) => {
            this.write(data);
        });
    }

    componentWillUnmount() {
        this.xterm.close();
    }

    render() {
        return (
            <div style={{ width: '100%', height: 'calc(100% - 60px)', backgroundColor: 'black' }} ref={(ref) => this.containerRef = ref}></div>
        );
    }
}