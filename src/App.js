import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
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
    let persons = null;
    let btnClass = '';

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

      btnClass = classes.Red;
    }

    const charList = this.state.userInput.split('').map((ch, index) => {
      return <Char 
        character={ch} 
        key={index}
        clicked={() => this.deleteCharHandler(index)} />;
    });

    const assignedClasses = [];

    if (this.state.persons.length <=2 ) {
      assignedClasses.push(classes.red); // classes = ['red];
    }

    if (this.state.persons.length <=1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
        className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default App;