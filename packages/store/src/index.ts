abstract class StateMachine {
    abstract onEnter(): void;
    abstract update(): void;
    abstract onExit(): void;
}

class Iddle extends StateMachine {
    onEnter() {
        console.log('Iddle onEnter');
    }

    update() {
        console.log('Taking a break');
    }

    onExit() {
        console.log('Iddle onExit');
    }
}

class Walk extends StateMachine {
    onEnter() {
        console.log('Walk onEnter');
    }

    update() {
        console.log('Walking');
    }

    onExit() {
        console.log('Walk onExit');
    }
}

class Player {
    private state: StateMachine;

    constructor() {
        this.state = new Walk();
    }

    setState(state: StateMachine) {
        this.state.onExit();
        this.state = state;
        this.state.onEnter();
    }

    update() {
        this.state.update();
    }
}
