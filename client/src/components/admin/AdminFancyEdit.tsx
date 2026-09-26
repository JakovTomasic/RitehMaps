import { ReactNode } from "react";
import { AllMapsDataWithUuids } from "../../data/AdminObjects";
import { Edge, Hallway, Node, NodeType, ProfessorData, SubMap } from "../../data/ServerData";
import { v4 as uuidv4 } from "uuid";
import { AdminSaveButton } from "../../pages/admin";

type Props = {
    state: AdminFancyEditState,
    specialSaveText: string,
    updateState: (s: AdminFancyEditState) => void,
    save: (newData: AllMapsDataWithUuids) => void,
    showSubmap: (submapId: number) => void,
    showNode: (nodeId: string) => void,
    showEdge: (nodeOrHallwayId1: string, nodeOrHallwayId2: string) => void,
    showHallway: (hallwayId: string) => void,
};

export type AdminFancyEditState = {
    temporaryMapData: AllMapsDataWithUuids,
    expandNodes: boolean,
    expandEdges: boolean,
    expandHallways: boolean,
    expandProfessors: boolean,
    expandSubmaps: boolean,
};

type State = AdminFancyEditState;

const COLLAPSE_ALL = {
    expandNodes: false,
    expandEdges: false,
    expandHallways: false,
    expandProfessors: false,
    expandSubmaps: false,
};

const inputStyle = "w-full max-w-md rounded-md border border-gray-300 px-2.5 py-1.5 text-sm outline-none \
    transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

const labelStyle = "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500";

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
                    return { ...n, v: transform(n.v) };
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
                    return { ...n, v: transform(n.v) };
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
                    return { ...n, v: transform(n.v) };
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
                    return { ...n, v: transform(n.v) };
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
            // Submaps are stored without uuids, so the transformed submap is the new value itself
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

function deleteNode(uuid: string): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            nodes: s.temporaryMapData.nodes.filter((v) => v.uuid != uuid),
        }
    })
}

function deleteEdge(uuid: string): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            edges: s.temporaryMapData.edges.filter((v) => v.uuid != uuid),
        }
    })
}

function deleteHallway(uuid: string): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            hallways: s.temporaryMapData.hallways.filter((v) => v.uuid != uuid),
        }
    })
}

function deleteProfessor(uuid: string): (s: State) => State {
    return s => ({
        ...s,
        temporaryMapData: {
            ...s.temporaryMapData,
            professors: s.temporaryMapData.professors.filter((v) => v.uuid != uuid),
        }
    })
}

export default function AdminFancyEdit(props: Props) {

    const state = props.state;
    const setState = (update: (s: State) => State) => {
        props.updateState(update(state));
    };

    const save = () => {
        props.save(state.temporaryMapData);
    };

    return(
        <div className="flex w-full flex-col">

            <div className="mb-5 flex flex-wrap gap-2">
                <AddButton
                    text="Dodaj čvor"
                    onClick={() => setState(s => ({
                        ...s,
                        temporaryMapData: {
                            ...s.temporaryMapData,
                            nodes: [
                                {
                                    uuid: uuidv4(),
                                    v: {
                                        nodeId: "",
                                        names: [],
                                        submapId: s.temporaryMapData.submaps[0]!.id,
                                        x: 0,
                                        y: 0,
                                        type: NodeType.CLASSROOM,
                                    }
                                },
                                ...s.temporaryMapData.nodes,
                            ]
                        },
                        ...COLLAPSE_ALL,
                        expandNodes: true,
                    }))} />
                <AddButton
                    text="Dodaj spoj"
                    onClick={() => setState(s => ({
                        ...s,
                        temporaryMapData: {
                            ...s.temporaryMapData,
                            edges: [
                                {
                                    uuid: uuidv4(),
                                    v: {
                                        nodeId1: "",
                                        nodeId2: "",
                                    }
                                },
                                ...s.temporaryMapData.edges,
                            ]
                        },
                        ...COLLAPSE_ALL,
                        expandEdges: true,
                    }))} />
                <AddButton
                    text="Dodaj hodnik"
                    onClick={() => setState(s => ({
                        ...s,
                        temporaryMapData: {
                            ...s.temporaryMapData,
                            hallways: [
                                {
                                    uuid: uuidv4(),
                                    v: {
                                        id: "",
                                        submapId: s.temporaryMapData.submaps[0]!.id,
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 0,
                                    }
                                },
                                ...s.temporaryMapData.hallways,
                            ]
                        },
                        ...COLLAPSE_ALL,
                        expandHallways: true,
                    }))} />
            </div>

            <Section
                title="Čvorovi"
                count={state.temporaryMapData.nodes.length}
                expanded={state.expandNodes}
                onToggle={() => setState(s => ({ ...s, expandNodes: !s.expandNodes }))}>
                { state.temporaryMapData.nodes.map((node, index) => (
                    <ItemCard
                        key={node.uuid}
                        title={node.v.nodeId.length > 0 ? node.v.nodeId : "(novi čvor)"}
                        onShow={() => props.showNode(node.v.nodeId)}
                        onDelete={() => { setState(deleteNode(node.uuid)) }}>

                        <Field label="id">
                            <input className={inputStyle} type="text" value={node.v.nodeId} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    nodeId: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="names">
                            <input className={inputStyle} type="text" value={joinString(node.v.names)} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    names: splitString(newValue.target.value),
                                })))
                            }/>
                        </Field>
                        <Field label="submapId">
                            <select className={inputStyle} value={node.v.submapId} onChange={ newValue =>
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
                        </Field>
                        <Field label="type">
                            <select className={inputStyle} value={NodeType[node.v.type]} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    type: NodeType[newValue.target.value as keyof typeof NodeType],
                                }))) }>
                                { Object.keys(NodeType).filter((v) => isNaN(Number(v))).map(t =>
                                    <option key={t} value={t}>{t}</option>
                                )}
                            </select>
                        </Field>
                        <Field label="x%">
                            <input className={inputStyle} type="number" value={node.v.x} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    x: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                        <Field label="y%">
                            <input className={inputStyle} type="number" value={node.v.y} onChange={ newValue =>
                                setState(updateNode(index, (oldNode) => ({
                                    ...oldNode,
                                    y: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                    </ItemCard>
                )) }
            </Section>

            <Section
                title="Spojevi"
                count={state.temporaryMapData.edges.length}
                expanded={state.expandEdges}
                onToggle={() => setState(s => ({ ...s, expandEdges: !s.expandEdges }))}>
                { state.temporaryMapData.edges.map((edge, index) => (
                    <ItemCard
                        key={edge.uuid}
                        title={`${edge.v.nodeId1 || "?"} — ${edge.v.nodeId2 || "?"}`}
                        onShow={() => props.showEdge(edge.v.nodeId1, edge.v.nodeId2)}
                        onDelete={() => { setState(deleteEdge(edge.uuid)) }}>

                        <Field label="nodeId1">
                            <input className={inputStyle} type="text" value={edge.v.nodeId1} onChange={ newValue =>
                                setState(updateEdge(index, (oldEdge) => ({
                                    ...oldEdge,
                                    nodeId1: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="nodeId2">
                            <input className={inputStyle} type="text" value={edge.v.nodeId2} onChange={ newValue =>
                                setState(updateEdge(index, (oldEdge) => ({
                                    ...oldEdge,
                                    nodeId2: newValue.target.value,
                                })))
                            }/>
                        </Field>
                    </ItemCard>
                )) }
            </Section>

            <Section
                title="Hodnici"
                count={state.temporaryMapData.hallways.length}
                expanded={state.expandHallways}
                onToggle={() => setState(s => ({ ...s, expandHallways: !s.expandHallways }))}>
                { state.temporaryMapData.hallways.map((hallway, index) => (
                    <ItemCard
                        key={hallway.uuid}
                        title={hallway.v.id.length > 0 ? hallway.v.id : "(novi hodnik)"}
                        onShow={() => props.showHallway(hallway.v.id)}
                        onDelete={() => { setState(deleteHallway(hallway.uuid)) }}>

                        <Field label="id">
                            <input className={inputStyle} type="text" value={hallway.v.id} onChange={ newValue =>
                                setState(updateHallways(index, (oldHallway) => ({
                                    ...oldHallway,
                                    id: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="submapId">
                            <select className={inputStyle} value={hallway.v.submapId} onChange={ newValue =>
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
                        </Field>
                        <Field label="Jedan rub: x1%">
                            <input className={inputStyle} type="number" value={hallway.v.x1} onChange={ newValue =>
                                setState(updateHallways(index, (oldNode) => ({
                                    ...oldNode,
                                    x1: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                        <Field label="Jedan rub: y1%">
                            <input className={inputStyle} type="number" value={hallway.v.y1} onChange={ newValue =>
                                setState(updateHallways(index, (oldNode) => ({
                                    ...oldNode,
                                    y1: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                        <Field label="Drugi rub: x2%">
                            <input className={inputStyle} type="number" value={hallway.v.x2} onChange={ newValue =>
                                setState(updateHallways(index, (oldNode) => ({
                                    ...oldNode,
                                    x2: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                        <Field label="Drugi rub: y2%">
                            <input className={inputStyle} type="number" value={hallway.v.y2} onChange={ newValue =>
                                setState(updateHallways(index, (oldNode) => ({
                                    ...oldNode,
                                    y2: parseFloat(newValue.target.value),
                                })))
                            }/>
                        </Field>
                    </ItemCard>
                )) }
            </Section>

            <Section
                title="Djelatnici"
                count={state.temporaryMapData.professors.length}
                expanded={state.expandProfessors}
                onToggle={() => setState(s => ({ ...s, expandProfessors: !s.expandProfessors }))}>
                { state.temporaryMapData.professors.map((professor, index) => (
                    <ItemCard
                        key={professor.uuid}
                        title={professor.v.name.length > 0 ? professor.v.name : "(novi djelatnik)"}
                        onDelete={() => { setState(deleteProfessor(professor.uuid)) }}>

                        <Field label="name">
                            <input className={inputStyle} type="text" value={professor.v.name} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    name: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="room">
                            <input className={inputStyle} type="text" value={professor.v.room} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    room: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="phone number">
                            <input className={inputStyle} type="text" value={professor.v.phoneNumber} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    phoneNumber: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="internal phone number">
                            <input className={inputStyle} type="text" value={professor.v.internalPhoneNumber} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    internalPhoneNumber: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        <Field label="email">
                            <input className={inputStyle} type="text" value={professor.v.email} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    email: newValue.target.value,
                                })))
                            }/>
                        </Field>
                        {/* <Field label="Dio faksa di radi">
                            <input className={inputStyle} type="text" value={professor.v.entity} onChange={ newValue =>
                                setState(updateProfessor(index, (oldProfessor) => ({
                                    ...oldProfessor,
                                    entity: newValue.target.value,
                                })))
                            }/>
                        </Field> */}
                    </ItemCard>
                )) }
            </Section>

            <Section
                title="Dijelovi karte (submap)"
                count={state.temporaryMapData.submaps.length}
                expanded={state.expandSubmaps}
                onToggle={() => setState(s => ({ ...s, expandSubmaps: !s.expandSubmaps }))}>
                { state.temporaryMapData.submaps.map((submap, index) => (
                    <ItemCard
                        key={submap.id}
                        title={`id = ${submap.id}`}
                        onShow={() => props.showSubmap(submap.id)}>

                        <Field label="ime karte">
                            <input className={inputStyle} type="text" value={submap.caption} onChange={ newValue =>
                                setState(updateSubmaps(index, (oldSubmap) => ({
                                    ...oldSubmap,
                                    caption: newValue.target.value,
                                })))
                            }/>
                        </Field>
                    </ItemCard>
                )) }
            </Section>

            <AdminSaveButton specialSaveText={props.specialSaveText} save={save} />
        </div>
    );
}

function AddButton({ text, onClick }: { text: string, onClick: () => void }) {
    return (
        <button
            className="rounded-lg border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-cyan-700
                transition hover:bg-cyan-50"
            onClick={onClick}>
            + {text}
        </button>
    );
}

function Section(
    { title, count, expanded, onToggle, children }:
    { title: string, count: number, expanded: boolean, onToggle: () => void, children: ReactNode }
) {
    return (
        <section className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <button
                className="flex w-full items-center gap-3 px-4 py-3 text-left font-semibold text-gray-800 transition hover:bg-gray-50"
                onClick={onToggle}>
                <span className={`text-xs text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`}>▶</span>
                <span>{title}</span>
                <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                    {count}
                </span>
            </button>
            { !expanded ? <></> :
                <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-4">
                    {children}
                </div>
            }
        </section>
    );
}

function ItemCard(
    { title, onShow, onDelete, children }:
    { title: string, onShow?: () => void, onDelete?: () => void, children: ReactNode }
) {
    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed && onDelete) {
            onDelete();
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                <span className="truncate font-semibold text-gray-700">{title}</span>
                <div className="ml-auto flex shrink-0 gap-2">
                    { onShow === undefined ? <></> :
                        <button
                            className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-600
                                transition hover:bg-gray-100 hover:text-gray-800"
                            onClick={onShow}>
                            Show
                        </button>
                    }
                    { onDelete === undefined ? <></> :
                        <button
                            className="rounded-md border border-red-200 px-3 py-1 text-sm font-semibold text-red-500
                                transition hover:bg-red-50 hover:text-red-600"
                            onClick={handleDelete}>
                            Delete
                        </button>
                    }
                </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {children}
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string, children: ReactNode }) {
    return (
        <label className="block">
            <span className={labelStyle}>{label}</span>
            {children}
        </label>
    );
}
