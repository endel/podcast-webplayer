import Graphics from './Graphics';
import Player from './Player';

var html = `
  <svg width="100%" viewbox="0 0 100 100">
    <circle id="circle" cx="50" cy="50" r="40" stroke="white" stroke-width="6"/>

    <polygon id="play" points="45,40 45,60, 60,50" fill="white"
    stroke="white" stroke-width="8" stroke-linecap="butt"></polygon>

    <path id="pause" d="M40,32V68 M60,32V68" fill="white"
    stroke="white" stroke-width="8" stroke-linecap="butt"></path>

    <defs>
      <clipPath id="cut-off-bottom">
        <rect x="0" y="0" width="50" height="100" />
      </clipPath>
    </defs>

    <circle id="spinner" cx="50" cy="50" r="25"
    stroke="white" fill="black" stroke-width="4" stroke-linecap="butt"
    clip-path="url(#cut-off-bottom)"></circle>
  </svg>
`;

export default class PlayButton extends Graphics {
  constructor() {
    super('playButton', html);
    this.state = Player.IDLE;
    this.element.addEventListener('click', this.onClick.bind(this));
    this.onClick = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    this.updateState();
  }

  updateState() {
    this.setNodeAttr('spinner', 'opacity', this._state === Player.LOADING ? 1 : 0);
    this.setNodeAttr('pause', 'opacity', this._state === Player.PLAYING ? 1 : 0);
    this.setNodeAttr('play', 'opacity', this._state === Player.PAUSED ? 1 : 0);
    this.element.style.cursor = this.interactive ? 'pointer' : 'auto';
  }

  get interactive() {
    return this._state === Player.PLAYING || this._state === Player.PAUSED;
  }

  onClick() {
    if (this.onClick && this.interactive) {
      this.onClick();
    }
  }
}
