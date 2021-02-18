/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Cards extends Component {
  constructor() {
    super();
    this.state = {
      persons: [],
      addCardInput: '',
      StateIssuedDivorceId: '',
      name: '',
      step: 0,
      DOB: '',
      Nationality: '',
      id: undefined,
      MaritalStatus: '',
      HighestEducation: '',
    };
  }




//   handleAdd = () => {
//     const cardName = this.state.addCardInput;
//     if (cardName !== '') {
//       fetch(
//         `https://api.trello.com/1/cards?name=${cardName}&idList=${this.props.id}&keepFromSource=all&key=${API_KEY}&token=${TOKEN}`,
//         {
//           method: 'POST'
//         }
//       )
//         .then(cardData => cardData.json())
//         .then(newCard =>
//           this.setState({ cards: this.state.cards.concat([newCard]) })
//         );
//     } else {
//       alert('can not add empty card');
//     }
//   };

fetchApi = async (opt, step) => {
      fetch(`http://localhost:5000/create`, {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: opt
      })
        .then(data => data.json())
        .then(data => {
            this.setState({
              id: data.insertId,
              step: step+1,
       })
        });
    
}


updateApi = async (opt, step) => {
  fetch(`http://localhost:5000/update/${this.state.id}`, {
    method: 'post',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
body: opt
  })
    .then(data => data.json())
    .then(data => {
      console.log(data)
        this.setState({
          step: step+1,
   })
    });

}

renderSecondStep = () =>{
    return (
        <div>
         <p> Date of Birth: <input name="DOB" value={this.state.DOB}  onChange = {(e)=> this.setState({
             DOB: e.target.value
         })}/></p>
           <p> Nationality: <input name="Nationality" value={this.state.Nationality}  onChange = {(e)=> this.setState({
            Nationality : e.target.value
         })}/></p>
         <button onClick={()=> this.updateApi(`Nationality=${this.state.Nationality}&DOB=${this.state.DOB}&step=${this.state.step}`, this.state.step) }>
             next
         </button>
        </div>
      );
}

renderFirstStep = () =>{
  return (
      <div>
       <p> name: <input name="name" value={this.state.name}  onChange = {(e)=> this.setState({
           name: e.target.value
       })}/></p>
         <p> State Issued Divorce Id: <input name="StateIssuedDivorceId" value={this.state.StateIssuedDivorceId}  onChange = {(e)=> this.setState({
          StateIssuedDivorceId : e.target.value
       })}/></p>
       <button onClick={()=> this.state.id ? this.updateApi(`Name=${this.state.name}&StateIssuedDivorceId=${this.state.StateIssuedDivorceId}&step=${this.state.step}`, this.state.step) : this.fetchApi(`Name=${this.state.name}&StateIssuedDivorceId=${this.state.StateIssuedDivorceId}`, this.state.step) }>
           next
       </button>
      </div>
    );
}

renderThirdStep = () =>{
  return (
      <div>
       <p> MaritalStatus: <input name="MaritalStatus" value={this.state.MaritalStatus}  onChange = {(e)=> this.setState({
           MaritalStatus: e.target.value
       })}/></p>
         <p> HighestEducation: <input name="HighestEducation" value={this.state.HighestEducation}  onChange = {(e)=> this.setState({
          HighestEducation : e.target.value
       })}/></p>
       <button onClick={()=> this.updateApi(`HighestEducation=${this.state.HighestEducation}&MaritalStatus=${this.state.MaritalStatus}&step=${this.state.step}`, -1) }>
           submit
       </button>
      </div>
    );
}


  componentDidMount() {
    if(this.state.step === 0 ){
        fetch(
            `http://localhost:5000/get-data`,
            {
              method: 'GET'
            }
          )
            .then(data => data.json())
            .then(data => {
              this.setState({
                persons: data
              });
            });
    }
  }


  fetchData = (id) => {
    if(this.state.step === 0 ){
        fetch(
            `http://localhost:5000/get-data/${id}`,
            {
              method: 'GET'
            }
          )
            .then(data => data.json())
            .then(data => {
              console.log("data",data)
              this.setState({
                StateIssuedDivorceId: data.StateIssuedDivorceId,
                name: data.Name,
                step: 1,
                DOB: data.DOB,
                Nationality: data.Nationality,
                MaritalStatus: data.MaritalStatus,
                HighestEducation: data.HighestEducation,
              });
            });
    }
  }


  UNSAFE_componentWillReceiveProps() {
    if(window.location.pathname.slice(1) === 'create'){
    
        this.setState({
            step: 1,
        })
    }
  }

  render() {
    const persons = this.state.persons;
    console.log("state", this.state)
    return (
        <React.Fragment>
       {
           this.state.step === 0 && 
           <>
            <Link to="/create">
           <button className="btn btn-secondary btn-sm ">add person</button>
         </Link>
             {persons.map(person => (
                 <div>
                   <button onClick={()=> this.fetchData(person.id)}> edit </button>
                     <p>name:{person.Name}</p>
                     <p> DOB:{person.DOB}</p>
                     <p> MaritalStatus:{person.MaritalStatus}</p>
                     <p>  Nationality:{person.Nationality}</p>
                     <p> HighestEducation:{person.HighestEducation}</p>
                     <p>  StateIssuedDivorceId:{person.StateIssuedDivorceId}</p>
                     <br/>
                 </div>
             ))}
        </>
       }
       {
           this.state.step === 1 && 
            this.renderFirstStep()
       }
        {
           this.state.step === 2 && 
            this.renderSecondStep()
       }
        {
           this.state.step === 3 && 
            this.renderThirdStep()
       }
      </React.Fragment>
    );
  }
}

export default Cards;
