import React, { PureComponent } from 'react';
import { Terminal as XTerminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as os from 'os';
import * as pty from 'node-pty';

const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

export default class Terminal extends PureComponent {
    containerRef = null;
    shellProcess = null;
    xterm = null;

    constructor(props) {
        super(props);
        
        XTerminal.applyAddon(fit);
        this.xterm = new XTerminal({
            cursorBlink: true,
            disableStdin: false,
            cols: 20
        });

    }

    write(data) {
        this.xterm.write(data);
    }

    writeLine(data) {
        this.xterm.writeln(data);
    }

    componentDidMount() {
        this.shellProcess = pty.spawn(shell, [], {
            name: 'xterm-256color',
            cwd: process.cwd(),
            env: process.env
        });

        this.xterm.open(this.containerRef);

        this.xterm.on('data', (data) => {
            this.shellProcess.write(data);
        });

        this.xterm.on('paste', (data, ev) => {
            this.write(data);
        });

        this.shellProcess.on('data', (data) => {
            this.write(data);
        });
    }

    componentDidUpdate() {
        if(this.props.value) {
            this.shellProcess.write(`${this.props.value}\r`);
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: 'calc(100% - 60px)', padding: "10px", backgroundColor: 'black' }} ref={(ref) => this.containerRef = ref}></div>
        );
    }
}