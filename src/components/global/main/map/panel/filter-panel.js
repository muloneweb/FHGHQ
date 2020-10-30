import React, { useState } from 'react';
import {connect} from 'react-redux';
const repo = '/assets/panel-icons/'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import LGC from './checkbox';
import './panel.scss';

function FilterPanel_(props) {
    const { display, toggleCategory, toggleGrid, toggleRanges, toggleSatMap } = props;

    const [dropdownOpen, setDropdownOpen] = useState(0);
    const toggle = (index) => {
        if(index === dropdownOpen) {
            setDropdownOpen(0);
        } else {
            setDropdownOpen(index);
        }
    };

    return (
        <div className='mapcontrol-panel'>
            <Dropdown isOpen={dropdownOpen == 1} toggle={() => toggle(1)}>
                <input type="checkbox" 
                       checked={display.objectives.total} 
                       onChange={() => toggleCategory('objectives')} />
                <DropdownToggle className='mapcontrol-btn' caret>
                <img className="mapcontrol-image" 
                     src={ repo + 'MapIconStaticBase2.png'} />
                </DropdownToggle>
                <DropdownMenu>
                    <LGC cat='objectives' item='towns' name='Town Halls' src={ repo + 'MapIconStaticBase2.png' }/>
                    <LGC cat='objectives' item='forts' name='Relic Bases' src={ repo + 'MapIconRelicBase.png' }/>
                    <LGC cat='objectives' item='towers' name='Obs. Towers' src={ repo + 'MapIconObservationTower.png' }/>
                    <LGC cat='objectives' item='safehouses' name='Safehouses' src={ repo + 'Safehouse.png' }/>
                </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdownOpen == 2} toggle={() => toggle(2)}>
                <input type="checkbox" 
                       checked={display.production.total} 
                       onChange={() => toggleCategory('production')} />
                <DropdownToggle className='mapcontrol-btn' caret>
                <img className="mapcontrol-image" 
                     src={ repo + 'MapIconFactory.png'} />
                </DropdownToggle>
                <DropdownMenu>
                    <LGC cat='production' item='refineries' name='Refineries' src={ repo + 'MapIconManufacturing.png' }/>
                    <LGC cat='production' item='productions' name='Factories' src={ repo + 'MapIconFactory.png' }/>
                    <LGC cat='production' item='storages' name='Storage Depots' src={ repo + 'MapIconStorageFacility.png' }/>
                    <LGC cat='production' item='armories' name='Ammo Factories' src={ repo + 'MapIconArmory.png' }/>
                    <LGC cat='production' item='hospitals' name='Hospitals' src={ repo + 'MapIconHospital.png' }/>
                    <LGC cat='production' item='vfactories' name='Vehicle Factories' src={ repo + 'MapIconVehicle.png' }/>
                    <LGC cat='production' item='shipyards' name='Shipyards' src={ repo + 'MapIconShipyard.png' }/>
                    <LGC cat='production' item='constructions' name='Constr. Yards' src={ repo + 'MapIconConstructionYard.png' }/>
                    <LGC cat='production' item='rocketsites' name='Rocket Sites' src={ repo + 'MapIconRocketSite.png' }/>
                </DropdownMenu> 
            </Dropdown>

            <Dropdown isOpen={dropdownOpen == 3} toggle={() => toggle(3)}>
                <input type="checkbox" 
                       checked={display.resources.total} 
                       onChange={() => toggleCategory('resources')} />
                <DropdownToggle className='mapcontrol-btn' caret>
                <img className="mapcontrol-image" 
                     src={ repo + 'MapIconSalvage.png'} />
                </DropdownToggle>
                <DropdownMenu>
                    <LGC cat='resources' item='salvage' name='Salvage' src={ repo + 'MapIconSalvage.png' }/>
                    <LGC cat='resources' item='components' name='Components' src={ repo + 'MapIconComponents.png' }/>
                    <LGC cat='resources' item='sulfur' name='Sulfur' src={ repo + 'MapIconSulfur.png' }/>
                    <LGC cat='resources' item='mine_salvage' name='Salvage Mines' src={ repo + 'MapIconScrapMine.png' }/>
                    <LGC cat='resources' item='mine_components' name='Component Mines' src={ repo + 'MapIconComponentMine.png' }/>
                    <LGC cat='resources' item='mine_sulfur' name='Sulfur Mines' src={ repo + 'MapIconSulfurMine.png' }/>
                    <LGC cat='resources' item='mine_oil' name='Oil Wells' src={ repo + 'MapIconOilWell.png' }/>
                </DropdownMenu>
            </Dropdown>

            <Dropdown isOpen={dropdownOpen == 4} toggle={() => toggle(4)}>
                <input type="checkbox" 
                       checked={display.custom.total} 
                       onChange={() => toggleCategory('custom')} />
                <DropdownToggle className='mapcontrol-btn' caret>
                <img className="mapcontrol-image" 
                     src={ repo + 'Note.png'} />
                </DropdownToggle>
                <DropdownMenu>
                    <LGC cat='custom' item='requests' name='Logi Requests' src={ repo + 'LogiRequest.png' }/>
                    <LGC cat='custom' item='fobs' name='Outposts' src={ repo + 'Outpost.png' }/>
                    <LGC cat='custom' item='miscicons' name='Misc. Icons' src={ repo + 'Note.png' }/>
                    <LGC cat='custom' item='lines' name='Lines' src={ repo + 'Line.png' }/>
                </DropdownMenu>
            </Dropdown>

            <input type="checkbox" 
                       checked={display.grid} 
                       onChange={toggleGrid} />
            <img className="mapcontrol-image" 
                 src={ repo + 'grid.png'} />

            <input type="checkbox" 
                 checked={display.ranges} 
                 onChange={toggleRanges} />
            <img className="mapcontrol-image" 
                 src={ repo + 'ranges.png'} />

            <input type="checkbox" 
                 checked={display.satmap} 
                 onChange={toggleSatMap} />
            <img className="mapcontrol-image" 
                 src={ repo + 'satmap.png'} />

        </div>
    );
}

const mapStateToProps = store => {
    return {
        display: store.display
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleCategory: (category) => dispatch({ type: 'TOGGLE_DISPLAY_CATEGORY', payload: category }),
        toggleGrid: () => dispatch({ type: 'TOGGLE_GRID' }),
        toggleRanges: () => dispatch({ type: 'TOGGLE_RANGES' }),
        toggleSatMap: () => dispatch({ type: 'TOGGLE_SAT_MAP' })
    }
}

export const FilterPanel = connect(mapStateToProps, mapDispatchToProps)(FilterPanel_);
