import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/monokai';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsVal: "",
            htmlVal: "",
            cssVal: ""
        }
        this.changeJS = this.changeJS.bind(this);
        this.changeHtml = this.changeHtml.bind(this);
        this.changeCSS = this.changeCSS.bind(this);
        this.runScript = this.runScript.bind(this);
    }

    changeJS(newValue) {
        this.setState({ jsVal: newValue.trim() });
    }
    changeHtml(newValue) {
        this.setState({ htmlVal: newValue.trim() });
    }
    changeCSS(newValue) {
        this.setState({ cssVal: newValue.trim() });
    }
    loadNewWindow(html) {
        var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        if(html) {
            var win = window.open('', '_blank', strWindowFeatures);
            var iframe = document.createElement('iframe');
            iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
            iframe.style= "height:100%; width: 100%;";
            win.document.body.appendChild(iframe);
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(html);
            iframe.contentWindow.document.close();
        }
    }
    runScript() {
        let { jsVal, htmlVal, cssVal } = this.state;
        const data = { jsVal, htmlVal, cssVal };

        fetch('http://localhost:3006/api/sendData', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(data => this.setState({ apiInfo: data}, () => this.loadNewWindow(this.state.apiInfo)));

    }
    render() {
        return(
            <div className="container">
                <div className="grid-1 callout primary">
                    <span className="textOverlay"> HTML</span>
                    <AceEditor
                        mode="html"
                        theme="monokai"
                        name="htmlEditor"
                        onLoad={this.onLoad}
                        onChange={this.changeHtml}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.state.htmlVal}
                        
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />
                </div>

                <div className="grid-2 callout warning">
                    <span className="textOverlay"> JavaScript </span>
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        onChange={this.changeJS}
                        name="jsEditor"
                        editorProps={{$blockScrolling: true}}
                        value={this.state.jsVal}
                        
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true
                        }}
                    /> 
                </div>

                <div className="grid-3 callout alert">
                    <span className="textOverlay"> CSS</span>
                    <AceEditor
                        mode="css"
                        theme="monokai"
                        name="cssEditor"
                        onLoad={this.onLoad}
                        onChange={this.changeCSS}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.state.cssVal}
                        
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />
                </div>

                <div className="grid-4 callout success">
                    <button type="button"onClick={this.runScript} > Run </button>
                    <span className="textOverlay"> Output</span>
                    <div id="output"></div>
                </div>
            </div>

        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
