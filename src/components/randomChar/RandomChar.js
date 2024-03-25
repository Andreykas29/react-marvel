import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import MarverService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class RandomChar extends Component {
    constructor(props){
        super(props);
        this.updateChar();
    }
    state = {
        char: {},
        loading: true,
        error: false
    }
    marverService = new MarverService();

    onCharLoaded = (char) => {
        this.setState({char, loading:false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random()* (1011400 - 1011000) + 1011000);
        this.marverService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading:false, 
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        
        const isDescription = char.description  ? char.description : 'Description does not exist';
        const isLong = isDescription.length > 200 ? isDescription.slice(0, 200) + '...' : isDescription

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} isLong={isLong} /> : null;

        

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char, isLong}) => {
    
    const {name, thumbnail, homepage, wiki} = char
    
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {isLong}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;