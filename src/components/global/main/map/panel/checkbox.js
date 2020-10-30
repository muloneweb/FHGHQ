import React from 'react';
import { connect } from 'react-redux';

function Checkbox(props) { //Layer Group Category
    const { display, toggleItem, name, cat, item, src} = props;
    return (
        <div>
            <input className="mapcontrol_filter_checkbox" 
                   type="checkbox"  
                   checked={display[cat][item]} 
                   onChange={() => toggleItem({ category: cat, item: item })} />
            <img className="mapcontrol-image-item" src={src} /> 
            {name}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        toggleItem: ({category, item}) => dispatch({ type: 'TOGGLE_DISPLAY_ITEM', payload: { category, item } })
    }
}

const mapStateToProps = store => {
    return {
        display: store.display
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
