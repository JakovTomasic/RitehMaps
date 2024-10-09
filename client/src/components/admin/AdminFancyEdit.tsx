import { useState } from "react";
import { AllMapsData, Edge, Hallway, Node, NodeType, ProfessorData, SubMap } from "../../data/ServerData";

type Props = {
    temporaryMapData: AllMapsData,
    save: (newData: AllMapsData) => void,
    showSubmap: (submapId: number) => void,
};

type State = {
    temporaryMapData: AllMapsData,
    expandNodes: boolean,
    expandEdges: boolean,
    expandHallways: boolean,
    expandProfessors: boolean,
    expandSubmaps: boolean,
};

function joinString(arr: string[]): string {
    return arr.reduce((acc, name, i) => acc + ( i > 0 ? ", " : "") + name, "");
}

function splitString(str: string): string[] {
    return str.split(",").map(s => s.trim() );
}

function updateNode(index: number, transform: (oldNode: Node) => Node): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            nodes: s.temporaryMapData.nodes.map((n, i) => {
                if (i === index) {
                    return transform(n);
                } else {
                    return n;
                }
            })
        }
    })
}

function updateEdge(index: number, transform: (oldEdge: Edge) => Edge): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            edges: s.temporaryMapData.edges.map((n, i) => {
                if (i === index) {
                    return transform(n);
                } else {
                    return n;
                }
            })
        }
    })
}

function updateHallways(index: number, transform: (oldHallway: Hallway) => Hallway): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            hallways: s.temporaryMapData.hallways.map((n, i) => {
                if (i === index) {
                    return transform(n);
                } else {
                    return n;
                }
            })
        }
    })
}

function updateProfessor(index: number, transform: (oldProfessor: ProfessorData) => ProfessorData): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            professors: s.temporaryMapData.professors.map((n, i) => {
                if (i === index) {
                    return transform(n);
                } else {
                    return n;
                }
            })
        }
    })
}

function updateSubmaps(index: number, transform: (oldSubmap: SubMap) => SubMap): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            submaps: s.temporaryMapData.submaps.map((n, i) => {
                if (i === index) {
                    return transform(n);
                } else {
                    return n;
                }
            })
        }
    })
}

// TODO: implement "add new"
export default function AdminFancyEdit(props: Props) {

    const [state, setState] = useState<State>({
        temporaryMapData: props.temporaryMapData,
        expandNodes: false,
        expandEdges: false,
        expandHallways: false,
        expandProfessors: false,
        expandSubmaps: false,
    });

    const save = () => {
        props.save(state.temporaryMapData);
    };

    return(
        <div className="flex flex-col w-full">

            <div className="text-3xl text-red-500">Not yet implemented</div>

            <button
                className="w-full bg-slate-600 p-4 mb-4"
                onClick={() => setState(s => ({ ...s, expandNodes: !s.expandNodes }))}>
                Čvorovi { state.expandNodes ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandNodes ? <></> :
                <div>
                    {/* TODO: change id should change all places that id is used??? */}
                    { state.temporaryMapData.nodes.map((node, index) => (
                        <div className="m-4 p-4 bg-slate-400" key={node.nodeId}>
                            <div className="w-20 inline-block mb-1">id</div>
                            <input type="text" value={node.nodeId} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    nodeId: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">names</div>
                            <input type="text" value={joinString(node.names)} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    names: splitString(newValue.target.value),
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block">submapId</div>
                            <select value={node.submapId} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => {
                                    const sid = parseInt(newValue.target.value);
                                    return {
                                        ...oldNode,
                                        submapId: sid,
                                    }
                                })) }>
                                { state.temporaryMapData.submaps.map(sm => 
                                    <option key={sm.id} value={sm.id}>{sm.caption} (id={sm.id})</option>
                                )}
                            </select>
                            <br/>
                            <div className="w-20 inline-block mb-1">x%</div>
                            <input type="number" value={node.x} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    x: parseFloat(newValue.target.value),
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">y%</div>
                            <input type="number" value={node.y} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    y: parseFloat(newValue.target.value),
                                })))
                            }/>
                            <br/>
                            <select value={NodeType[node.type]} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    type: NodeType[newValue.target.value as keyof typeof NodeType],
                                }))) }>
                                { Object.keys(NodeType).filter((v) => isNaN(Number(v))).map(t => 
                                    <option key={t} value={t}>{t}</option>
                                )}
                            </select>
                        </div>
                    )) }
                </div>
            }

            <button
                className="w-full bg-slate-600 p-4 mb-4"
                onClick={() => setState(s => ({ ...s, expandEdges: !s.expandEdges }))}>
                Spojevi { state.expandEdges ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandEdges ? <></> :
                <div>
                    {/* TODO: dropdowns for edges? */}
                    { state.temporaryMapData.edges.map((edge, index) => (
                        <div className="m-4 p-4 bg-slate-400" key={index}>
                            <div className="w-20 inline-block mb-1">nodeId1</div>
                            <input type="text" value={edge.nodeId1} onChange={ newValue =>
                                setState(updateEdge(index, (oldEdge) => ({
                                    ...oldEdge,
                                    nodeId1: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">nodeId2</div>
                            <input type="text" value={edge.nodeId2} onChange={ newValue =>
                                setState(updateEdge(index, (oldEdge) => ({
                                    ...oldEdge,
                                    nodeId2: newValue.target.value,
                                })))
                            }/>
                            <br/>
                        </div>
                    )) }
                </div>
            }

            <button
                className="w-full bg-slate-600 p-4 mb-4"
                onClick={() => setState(s => ({ ...s, expandHallways: !s.expandHallways }))}>
                Hodnici { state.expandHallways ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandHallways ? <></> :
                <div>
                    {/* TODO: change id should change all places that id is used??? */}
                    { state.temporaryMapData.hallways.map((hallway, index) => (
                        <div className="m-4 p-4 bg-slate-400" key={hallway.id}>
                            <div className="w-20 inline-block mb-1">id</div>
                            <input type="text" value={hallway.id} onChange={ newValue =>
                                setState(updateHallways(index, (oldHallway) => ({
                                    ...oldHallway,
                                    id: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block">submapId</div>
                            <select value={hallway.submapId} onChange={ newValue =>
                                setState(updateHallways(index, (oldNode) => {
                                    const sid = parseInt(newValue.target.value);
                                    return {
                                        ...oldNode,
                                        submapId: sid,
                                    }
                                })) }>
                                { state.temporaryMapData.submaps.map(sm => 
                                    <option key={sm.id} value={sm.id}>{sm.caption} (id={sm.id})</option>
                                )}
                            </select>
                            <br/>
                            <div className="mt-2">Jedan rub:</div>
                            <div className="ml-8">
                                <div className="w-20 inline-block mb-1">x1%</div>
                                <input type="number" value={hallway.x1} onChange={ newValue =>
                                    setState(updateHallways(index, (oldNode) => ({
                                        ...oldNode,
                                        x1: parseFloat(newValue.target.value),
                                    })))
                                }/>
                                <br/>
                                <div className="w-20 inline-block mb-1">y1%</div>
                                <input type="number" value={hallway.y1} onChange={ newValue =>
                                    setState(updateHallways(index, (oldNode) => ({
                                        ...oldNode,
                                        y1: parseFloat(newValue.target.value),
                                    })))
                                }/>
                                <br/>
                            </div>
                            <div className="mt-2">Drugi rub:</div>
                            <div className="ml-8">
                                <div className="w-20 inline-block mb-1">x2%</div>
                                <input type="number" value={hallway.x2} onChange={ newValue =>
                                    setState(updateHallways(index, (oldNode) => ({
                                        ...oldNode,
                                        x2: parseFloat(newValue.target.value),
                                    })))
                                }/>
                                <br/>
                                <div className="w-20 inline-block mb-1">y2%</div>
                                <input type="number" value={hallway.y2} onChange={ newValue =>
                                    setState(updateHallways(index, (oldNode) => ({
                                        ...oldNode,
                                        y2: parseFloat(newValue.target.value),
                                    })))
                                }/>
                                <br/>
                            </div>
                        </div>
                    )) }
                </div>
            }

            <button
                className="w-full bg-slate-600 p-4 mb-4"
                onClick={() => setState(s => ({ ...s, expandProfessors: !s.expandProfessors }))}>
                Djelatnici { state.expandProfessors ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandProfessors ? <></> :
                <div>
                    { state.temporaryMapData.professors.map((professor, index) => (
                        <div className="m-4 p-4 bg-slate-400" key={index}>
                            <div className="w-20 inline-block mb-1">name</div>
                            <input type="text" value={professor.name} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    name: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">phone number</div>
                            <input type="text" value={professor.phoneNumber} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    phoneNumber: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">internal phone number</div>
                            <input type="text" value={professor.internalPhoneNumber} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    internalPhoneNumber: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">email</div>
                            <input type="text" value={professor.email} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    email: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">room</div>
                            <input type="text" value={professor.room} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    room: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <div className="w-20 inline-block mb-1">Dio faksa di radi</div>
                            <input type="text" value={professor.entity} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    entity: newValue.target.value,
                                })))
                            }/>
                            <br/>
                        </div>
                    )) }
                </div>
            }

            <button
                className="w-full bg-slate-600 p-4 mb-4"
                onClick={() => setState(s => ({ ...s, expandSubmaps: !s.expandSubmaps }))}>
                Dijelovi karte (submap) { state.expandSubmaps ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandSubmaps ? <></> :
                <div>
                    {/* TODO: view button */}
                    { state.temporaryMapData.submaps.map((submap, index) => (
                        <div className="m-4 p-4 bg-slate-400" key={submap.id}>
                            id = {submap.id}
                            <br/>
                            <div className="w-20 inline-block mb-1">ime karte</div>
                            <input type="text" value={submap.caption} onChange={ newValue =>
                                setState(updateSubmaps(index, (oldSubmap) => ({
                                    ...oldSubmap,
                                    caption: newValue.target.value,
                                })))
                            }/>
                            <br/>
                            <button onClick={() => props.showSubmap(submap.id)}>Show</button>
                        </div>
                    )) }
                </div>
            }


            <button onClick={save}>Save</button>
        </div>
    );
}