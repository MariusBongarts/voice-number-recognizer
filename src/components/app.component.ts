import { css, customElement, html, LitElement, property, unsafeCSS, queryAll, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

@customElement('marius-root')
class AppComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  recognizer!: SpeechRecognition;

  @property()
  results: string[] = [];


  firstUpdated() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    // recognition.lang = 'en-US';
    recognition.lang = 'de';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    this.recognizer = recognition;
    this.recognizer.onresult = (event: SpeechRecognitionEvent) => {
      console.log(event);
      const last = event.results.length - 1;
      const result = event.results[last][0].transcript as string;
      this.results = [...this.results, result];
    };
    this.recognizer.onspeechend  = () => {
      this.recognizer.stop();
    };

  }

  render() {
    return html`
  <h1>Test</h1>
  <button @click=${()=> this.recognizer.start()}>Start listening</button>
  ${this.results.map(result => html`<div>${result}</div>`)}
`;
  }

}
