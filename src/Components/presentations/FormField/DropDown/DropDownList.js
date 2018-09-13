import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './DropDownList.module.css';

class DropDownList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedItem: props.highlightedItem
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.handleHighlightRequest = this.handleHighlightRequest.bind(this);
    }

    handleSelection(e) {
        let index = Number(e.target.getAttribute("data-count")),
            selectedValue = {
                value: e.target.getAttribute("data-value"),
                text: e.target.textContent
            };

        if (!!this.props.onSelected) {
            this.props.onSelected(e, selectedValue, index);
        }
    }

    handleHighlightRequest(e) {
        let itemCount = Number(e.currentTarget.getAttribute("data-count"));
        this.setState({ highlightedItem: itemCount });
    }

    getIndex(valueItem, itemArray) {
        let valueIsObject = (!!valueItem.text);
        if ((valueItem !== "") && (valueIsObject)) {
            if (itemArray[0].text === undefined) {
                for (let i = 0; i < itemArray.length; i++) {
                    if (itemArray[i] === valueItem.text) {
                        return i;
                    }
                }
            } else {
                for (let i = 0; i < itemArray.length; i++) {
                    let item = itemArray[i],
                        isMatch = (item.text === valueItem.text) && (item.value === valueItem.value);
                    if (isMatch) {
                        return i;
                    }
                }
            }
        }
        return 0;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen
            && ((this.state.highlightedItem !== this.props.highlightedItem) && (this.state.highlightedItem === prevState.highlightedItem))) {
            this.setState({ highlightedItem: this.props.highlightedItem });
        }
    }

    render() {
        let queryItems, //If there is some value on the filterProps, then it will filter the items, otherwise will pass all values
            items = [], //This value is received by the Map
            filter = (!!this.props.value.text) ? this.props.value.text.toLowerCase().trim() : this.props.value.toLowerCase().trim(), //This is the character(s) typed
            filterLength = (!this.props.value.value) ? filter.length : 0, //Check the length of the filter to evaluate
            frameClasses = (this.props.isOpen) ? styles.frame : styles.hidden; //If isOpen then will style the frame, otherwise will hide it.

        if (this.props.isOpen) { //Check if is Open
            if (!!this.props.items) {
                if (filterLength > 0) {
                    queryItems = this.props.items.filter(function (item) {
                        let text = (!!item.text) ? item.text.toLowerCase() : item.toLowerCase();
                        return (text.indexOf(filter) > -1);
                    });
                } else {
                    queryItems = this.props.items;
                }

                //Array of the items to separate into one string.
                items = queryItems.map(function (item, index) {
                    let subParts = [], //This value will be hold it with each remaining parts of an evaluated character
                        subValue = "", //This value is the entry character to be evaluated.
                        isHighlighted = (this.state.highlightedItem === index), //Check the state to determine to highlight the row
                        itemClasses = isHighlighted ? styles.itemHighlight : styles.item, //Set the css based on the previous value
                        value = (!!item.value) ? item.value : item, //Check the character if is either an object or a string to add as a value of the list
                        entry = (!!item.text) ? item.text : item; //Check the character if is either an object or a string

                    //If there is no filter, then it'll render the items
                    if (filterLength < 1) {
                        subParts.push(entry); //Move the value in subParts array
                    } else {
                        //This loop will check for each character of the item to add the corresponding <span> for highligth or not
                        for (let counter = 0; counter < entry.length; counter++) {
                            if (filterLength > 1) {
                                subValue += entry[counter];
                                if ((subValue).trim().toLowerCase().indexOf(filter) > -1) {
                                    subParts.push(subValue.substring(0,
                                        subValue.trim().toLowerCase()
                                            .indexOf(filter))); //Move the value in subParts array
                                    subParts.push(<span key={counter} className={styles.highlight}>{ subValue.substring(subValue.trim().indexOf(filter)) }</span>); //Move the value in subParts array with tags
                                    subValue = ""; //Reset the value for a new character to evaluate
                                }
                            } else if (filterLength === 1) {
                                if ((entry[counter].toLowerCase() === filter.toLowerCase())) {
                                    subParts.push(
                                        <span key={counter} className={styles.highlight}>{entry[counter]}</span>); //Move the value in subParts array with tags
                                } else {
                                    subParts.push(entry[counter]); //Move the value in subParts array
                                }
                            }
                            //If there is some reminder on subValue, and the loop is finished, that character(s) will be added to the array.
                            if ((counter === entry.length - 1) && subValue.trim().length > 0) {
                                subParts.push(subValue); //Move the value in subParts array
                            }
                        }
                    }
                    return (<li className={itemClasses}
                        key={value}
                        data-count={index}
                        data-value={value}
                        onClick={this.handleSelection}
                        onMouseEnter={this.handleHighlightRequest}
                        onFocus={this.handleItemFocus}>
                        {subParts}
                    </li>);
                }, this);
            } else {
                items = (<li className={styles.noItem}> No items to display </li>);
            }
        }

        return (
            <div className={frameClasses} onFocus={this.handleFocus}>
                <ul onKeyDown={this.test}>{items}</ul>
            </div>
        );
    }
}

DropDownList.propTypes = {
    itemsProps: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
                text: PropTypes.string
            })
        ),
        PropTypes.arrayOf(PropTypes.string)
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isOpen: PropTypes.bool.isRequired,
    highlightedItem: PropTypes.number.isRequired,
    onSelected: PropTypes.func.isRequired,
    onHighlightChange: PropTypes.func.isRequired
}

DropDownList.defaultProps = {
    value: ""
}

//This DropDownList propTypes will allow as the first option an array of either number or string as a value with a string as a text.
//The second option can be an array of string.
//To handle the selection, we configured a onSelected function that will be require if items are prompted. 

export default DropDownList;