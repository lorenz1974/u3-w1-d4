import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from "react";

// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { sendMessage, manageComments } from './components/functions'; // Importo la funzione FetchFunction

import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import BookList from "./components/BookList"
import MyModal from "./components/MyModal"
import MySearch from "./components/MySearch"

import fantasyBooks from './assets/fantasy.json'
import historyBooks from './assets/history.json'
import horrorBooks from './assets/horror.json'
import romanceBooks from './assets/romance.json'
import scifiBooks from './assets/scifi.json'

export const booksArray = [
  ...fantasyBooks,
  ...historyBooks,
  ...horrorBooks,
  ...romanceBooks,
  ...scifiBooks,
].filter(
  (obj1, i, arr) => arr.findIndex((obj2) => obj2.asin === obj1.asin) === i
)
// Devo fare un filtro che estragga il primo ASIN tra i duplicati perché ci sono
// dei libri presenti in più categorie


document.getElementsByTagName('html')[0].classList.add('h-100')
document.getElementsByTagName('body')[0].classList.add('h-100')
document.getElementById('root').classList.add('h-100')



class App extends Component {

  state = {
    bookFilter: 'history', // Variabile per tenere traccia del filtro selezionato
    modalShow: false, // Variabile che gestisce l'apparizione del modale
    modalContent: {
      asin: '',
      title: '',
      img: '',
      price: 0,
      category: '',
    },
    search: false,
    searchTerms: '',
    selectedBooks: [],
    comments: [],
  }

  changeFilter = (label) => {
    this.setState({ bookFilter: label })
    console.log(`Filtro selezionato: ${label}`) // Per verificare
  }

  setModalShow = (state, content) => {
    this.setState({
      ...this.state,
      modalShow: state,
      modalContent: content,
    })
    console.log(`modalShow è: ${state}`) // Per verificare
    console.log(`content è: ${JSON.stringify(content)}`) // Per verificare
  }

  setSearchTerms = (terms, search) => {
    this.setState({
      ...this.state,
      searchTerms: terms,
      search: search,
    })
    console.log(`setSearchTerms searchTerms è : ${terms}`) // Per verificare
    console.log(`setSearchTerms search è : ${search}`) // Per verificare
  }

  setSelectedBooks = (asin) => {
    this.setState((prevState) => ({ // prevState è lo stato precedente fornito direttamente da React
      selectedBooks: prevState.selectedBooks.includes(asin)
        ? prevState.selectedBooks.filter((book) => book !== asin) // Rimuovi
        : [...prevState.selectedBooks, asin] // Aggiungi
    }));
    console.log(`selectedBooks è: ${this.state.selectedBooks}`) // Per verificare
  };



  render() {
    return (
      <div className="d-flex flex-column h-100">

        <header className="d-flex flex-column flex-shrink-0">
          <MyNav title="BookShop" changeFilter={this.changeFilter} fluid={true} />
          <Welcome />
        </header>

        <main className="container d-flex flex-column flex-grow-1">
          {this.state.searchTerms !== ''
            ? <h1 className='mt-5 text-capitalize'>Risultati per "{this.state.searchTerms}"</h1>
            : <h1 className='mt-5 text-capitalize'>Categoria {this.state.bookFilter}</h1>
          }
          <MySearch setSearchTerms={this.setSearchTerms} searchTerms={this.state.searchTerms}></MySearch>

          {this.state.modalShow &&
            <MyModal
              show={this.state.modalShow}
              modalContent={this.state.modalContent}
              onHide={() => this.setModalShow(false, {})}
            />}

          <BookList
            booksArray={booksArray}
            category={this.state.bookFilter}
            searchTerms={this.state.searchTerms}
            search={this.state.search}
            setSearchTerms={this.setSearchTerms}
            setModalShow={this.setModalShow}
            selectedBooks={this.state.selectedBooks}
            setSelectedBooks={this.setSelectedBooks}
          />

        </main>

        <footer className="d-flex flex-column flex-shrink-0">
          <MyFooter />
        </footer>

      </div>
    );
  }

}

export default App;

library.add(fab, fas, far)