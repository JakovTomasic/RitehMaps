import { useState } from "react";
import { AllMapsData, Node } from "../../data/ServerData";

type Props = {
    temporaryMapData: AllMapsData,
    save: (newData: AllMapsData) => void,
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
                className="w-full bg-slate-600 p-4"
                onClick={() => setState(s => ({ ...s, expandNodes: !s.expandNodes }))}>
                Čvorovi { state.expandNodes ? "[Hide]" : "[Show]" }
            </button>
            { !state.expandNodes ? <></> :
                <div>
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
                            {/* TODO: submapid
                            <div className="w-20 inline-block">submapId</div>
                            <input type="text" value={subm} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    names: splitString(newValue.target.value),
                                })))
                            }/>
                            <br/> */}
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
                            {/* TODO: type picker
                            type: {node.type} */}
                        </div>
                    )) }
                </div>
            }

            <button onClick={save}>Save</button>
        </div>
    );
}