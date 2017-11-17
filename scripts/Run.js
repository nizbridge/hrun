import React from 'react';
import '../css/app.css';

export default class Run extends React.Component {
    render() {
        return (
          <div className="runground">
                <RunnerField/>
          </div>
        );
    }
}

class RunnerField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runCounter : 1, // 말이 달리는 시간을 계산하기 위한 카운터
            status: false, // start 버튼 클릭유무 체크
            numChildren:8, // 말의 마리 수
            rank : [], // 순위 기록을 위한 배열
        };
    }

    // start 버튼
    handleClick = () => {
        this.setState({
            status : true,
        });
        // 버튼 클릭시 disabled 상태로 변경
        document.getElementsByTagName('button')[0].setAttribute('disabled','');
    }

    // 말이 결승점에 도착했을때
    handleGoal = (num) => {
      let ranklist = this.state.rank;

      ranklist.push(num); // 도착한 말의 번호를 배열에 추가
      this.setState({rank : ranklist, status: false});
    }

    // 말의 마리수 입력
    handleInputText = (event) => {
        this.setState({
            numChildren : event.target.value,
        });
    }

    render() {
        let childElement = [];

        // 입력한 숫자에 따라 말 생성
        for (let i = 0; i < this.state.numChildren; i += 1) {
            childElement.push(<Runner key={i} num={i} rank={this.state.rank} runCounter={this.state.runCounter} status={this.state.status} laptime={this.state.laptime} goal={this.handleGoal}/>);
        };

  	    return (
    	    <div>
            <span className="desc_text">달릴 말의 마리수를 입력하세요 : </span>
            <input className="inputtext" type="text" value={this.state.numChildren} onChange={this.handleInputText} />
            <button onClick={this.handleClick}>Start</button>
            {childElement}
          </div>
        );
    }
}

class Runner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            runCounter : this.props.runCounter, // 말의 시간체크를 위한 카운터
            laptime : 0, // 랩타임 기록
            timecheck : 0, // 1/100초 기록을 위한 시간체크
            rank : 0, // 등수기록을 위한 변수
        };
    }

    // Prop을 새로 받을때 실행
    componentWillReceiveProps(nextProps){
        if (nextProps.status) {
            this.setState({
                intervalId: setInterval(this.NumberIncrease, 25)
            });
        }
    }

    // 순위 확인을 위한 함수
    Checkrank = (ranklist, ranknum) => { // 순위배열과 자신의 번호를 인수로 받아서 계산
      let findrank;
      ranklist.forEach(function(value, i ) {
           if(value == ranknum){
             findrank = i+1;
           }
        });
      return findrank;
    }

    NumberIncrease = () => {
        // 0~10까지의 랜덤숫자를 더하여 달리기 진행
        let ranValue = Math.round(Math.random()*10);

        // 재미를 위해 빠르게 가거나 늦게가는 코드 추가
        if(ranValue > 5) ranValue = 0;
        else if(ranValue < 1) ranValue = 4;
        this.setState({
            runCounter: this.state.runCounter + ranValue
        });

        // 1/100 초로 랩타임 체크
        this.setState({
            timecheck : this.state.timecheck+1
        });
        if(this.state.timecheck === 4) { // 0.025초마다 interval 이 돌아가므로 4번째 즉 0.1초일때 랩타임 1을 추가
          this.setState({
              laptime : this.state.laptime+1,
              timecheck:0,
          });
        }

        // runCounter가 1000에 도달하면 (결승점에 도달하면 props.goal을 실행하고 종료
        if(this.state.runCounter >= 1000) {
            this.props.goal(this.props.num);
            this.setState({
              runCounter:1000,
              rank : this.Checkrank(this.props.rank, this.props.num),
            });
            clearInterval(this.state.intervalId);
        }
    }

    render() {
        return (
            <span className="runitem" style={{marginLeft: (this.state.runCounter/10)+'%'}}>
            <span className="itemnum">{this.props.num+1}</span>
            <span className="runtime" style={{display : this.state.runCounter === 1000 ? 'block' : 'none'}}>{this.state.rank}등 - {(this.state.laptime/6).toFixed(2)}</span></span>

        );
    }
}
