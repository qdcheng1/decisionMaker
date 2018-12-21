class DecisionMakerApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: props.options
        };
    }

    handleDeleteOptions() {
        //return the object directly
        //need parentheses to inlcude the object 
        this.setState(() => ({options: []}));
    }

    handleAddOption(option) {
        if (!option) {
            console.log("Error. invalid.");

            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            console.log("Error. Already exists.");
            return 'This option already exists.';
        }

        this.setState((previousState)=> {
            return {
                options: previousState.options.concat(option)
            };
        });
    }

    handlePick() {
        const option = this.state.options[Math.floor(Math.random() * this.state.options.length)];
        console.log("From handle pick.");
        alert(option);
    }
    render() {
        
        const subtitle = 'helps you make decisions!';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick = {this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

DecisionMakerApp.defaultProps = {
    options: []
};


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

//Default props
Header.defaultProps = {
    title: "Decision Maker"
};

const Action = (props) => {
    return (
        <button 
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
            What should I do?
        </button>
    );
};

const Options = (props) => {
    return ( 
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
                props.options.map(option => <Option key={option} optionText={option}/>)
            }
        </div>     
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText} 
        </div>
    );
};

class AddOption extends React.Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: undefined
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        console.log(error);
        this.setState(() => {
            return {error};
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='option'/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<DecisionMakerApp />, document.getElementById('app'));