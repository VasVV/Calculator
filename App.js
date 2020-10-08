const btns = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  subtract: "-",
  add: "+",
  multiply: "*",
  divide: "/",
  equals: "=",
  decimal: ".",
  clear: "C",
};
let counter = 0;

class Display extends React.Component {
  render() {
    return <div id="display">{this.props.numToDisplay}</div>;
  }
}

class Buttons extends React.Component {
  handleClick = (event) => {
    this.props.num(event.target.value);
  };

  handleKeyPress = (event) => {
    Object.values(btns).forEach((e) => {
      if (e == event.key && event.key !== "Enter") {
        this.props.num(e);
      }
    });
  };

  render() {
    return (
      <div className="grid-container">
        {Object.entries(btns).map((e) => (
          <button
            className="grid-item"
            type="button"
            value={e[1]}
            key={e}
            id={e[0]}
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            tabIndex={0}
          >
            {e[1]}
          </button>
        ))}
      </div>
    );
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.state = { num: ["0"] };
  }
  recieveNum = (num) => {
    //alert(this.state.num);
    if (num === "C") {
      counter = 0;
      this.setState({
        num: ["0"],
      });
    } else if (num === "=") {
      counter = 0;
      let arrjoin = this.state.num.join("");
      let reone = /([0-9])([\*\-\+\/]+)([\*\+\/])([0-9])/g;
      let retwo = /([0-9])([\*\-\+\/]+)([\*\-\+\/])(\-)([0-9])/g;
      let rep = arrjoin.replace(reone, "$1$3$4");
      let reptwo = rep.replace(retwo, "$1$3$4$5");

      let res = eval(reptwo);

      this.setState({
        num: [res],
      });
    } else {
      if (this.state.num[0] == "0" && num != ".") {
        this.setState({
          num: [this.state.num.shift()],
        });
      }

      if (num == ".") {
        counter++;
      }
      if (num == "." && this.state.num[0] == "0") {
        this.setState({
          num: ["0", "."], //wtf?
        });
      }
      if (num == "+" || num == "-" || num == "*" || num == "/") {
        counter = 0;
      }
      if (counter > 1 && num == ".") {
        this.setState({
          num: [
            ...this.state.num,
            this.state.num.slice(this.state.num.length - 1, 1),
          ],
        });
      } else {
        this.setState({
          num: [...this.state.num, num],
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Display numToDisplay={this.state.num} />
        <Buttons num={this.recieveNum} />
      </div>
    );
  }
}
ReactDOM.render(<Calc />, document.getElementById("root"));
