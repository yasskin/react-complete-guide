import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

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
    showPersons: false
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

  render() {
    const style = {
      backgroundColor:'white',
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
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <UserInput />
        <UserOutput userName={this.state.username[0].nickname} />
        <UserOutput userName={this.state.username[1].nickname} />
        <UserOutput userName={this.state.username[2].nickname} />
        <h2>Persons</h2>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default App;