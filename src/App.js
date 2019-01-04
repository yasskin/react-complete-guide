import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = { 
    persons: [
      { id: '17980', name: 'Max', age: 28 },
      { id: '02542', name: 'Manu', age: 29 },
      { id: '78903', name: 'Stephanie', age: 26 }
    ],
    username: [
      { nickname: "Bushwick Bob"},
      { nickname: "Vinegar Vinnie"},
      { nickname: "lo-fi Lorrie"}
    ],
    otherState: 'some other value',
    showPersons: false,
    userInput: ''
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]  
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p  => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]      
    }
    // const person = Object.assign({}, this.state.persons[personIndex]); // alternative approach without spread operator

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex]= person;

    this.setState({persons: persons})
  }

  deletePersonsHandler= (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons; // true or false, the current state
    this.setState({ showPersons: !doesShow });
  }

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value});
  }

  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({userInput: updatedText});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonsHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    const charList = this.state.userInput.split('').map((ch, index) => {
      return <Char 
        character={ch} 
        key={index}
        clicked={() => this.deleteCharHandler(index)} />;
    });

    const classes = [];

    if (this.state.persons.length <=2 ) {
      classes.push('red'); // classes = ['red];
    }

    if (this.state.persons.length <=1) {
      classes.push('bold'); // classes = ['red', 'bold']
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <input type="text" onChange={this.inputChangedHandler} value={this.state.userInput} />
        <p>{this.state.userInput}</p>
        <Validation inputLength={this.state.userInput.length} />
        {charList}
        {/* <UserInput />
        <UserOutput userName={this.state.username[0].nickname} />
        <UserOutput userName={this.state.username[1].nickname} />
        <UserOutput userName={this.state.username[2].nickname} /> */}
        <h2>Persons</h2>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
          style={style} 
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default App;