import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Columns3, MessageSquare, GripVertical, Upload, ChevronDown, ChevronRight, Save, StickyNote, Eye, EyeOff } from "lucide-react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

interface SceneImage {
  id: string;
  url: string;
  name: string;
  caption?: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

interface Scene {
  id: string;
  name: string;
  images: SceneImage[];
  comments: Comment[];
  saved?: boolean;
}

interface Episode {
  id: string;
  number: number;
  title: string;
  scenes: Scene[];
}

const EPISODES_DATA: Episode[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ep-${i + 1}`,
  number: i + 1,
  title: [
    "Joe's Bodega", "The Big Arrest", "The Mugshot", "The Courtroom", "The Bail Out",
    "The Lawyer", "The Evidence", "The Witness", "The Verdict", "The Aftermath",
  ][i],
  scenes: [],
}));

const userDisplayNames: Record<string, string> = {
  bpfadmin: "Staff (BPF)",
  ceezadmin: "Ceez",
  jazadmin: "Jasmine",
};

const StoryboardPage = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>(EPISODES_DATA);
  const [activeEp, setActiveEp] = useState<string>("ep-1");
  const [columns, setColumns] = useState(4);
  const [expandedEps, setExpandedEps] = useState<Set<string>>(new Set(["ep-1"]));
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSceneId, setUploadSceneId] = useState<string | null>(null);
  const [captionEditId, setCaptionEditId] = useState<string | null>(null);
  const [captionText, setCaptionText] = useState("");
  const [showCaptions, setShowCaptions] = useState(true);

  const currentUser = sessionStorage.getItem("bpf-user") || "bpfadmin";
  const displayName = userDisplayNames[currentUser] || currentUser;

  useEffect(() => {
    if (!sessionStorage.getItem("bpf-auth")) navigate("/login");
  }, [navigate]);

  const activeEpisode = episodes.find(e => e.id === activeEp);

  const addScene = (epId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== epId) return ep;
      const sceneNum = ep.scenes.length + 1;
      return { ...ep, scenes: [...ep.scenes, { id: `${epId}-scene-${Date.now()}`, name: `Scene ${sceneNum}`, images: [], comments: [], saved: false }] };
    }));
  };

  const handleImageUpload = (files: FileList | null, sceneId: string) => {
    if (!files) return;
    const newImages: SceneImage[] = Array.from(files).map(f => ({
      id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      url: URL.createObjectURL(f),
      name: f.name,
      caption: "",
    }));
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => s.id === sceneId ? { ...s, images: [...s.images, ...newImages], saved: false } : s) };
    }));
  };

  const removeImage = (sceneId: string, imgId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => s.id === sceneId ? { ...s, images: s.images.filter(img => img.id !== imgId) } : s) };
    }));
  };

  const onDragEnd = (result: DropResult, sceneId: string) => {
    if (!result.destination) return;
    const srcIdx = result.source.index;
    const destIdx = result.destination.index;
    if (srcIdx === destIdx) return;
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => {
        if (s.id !== sceneId) return s;
        const imgs = [...s.images];
        const [moved] = imgs.splice(srcIdx, 1);
        imgs.splice(destIdx, 0, moved);
        return { ...s, images: imgs };
      })};
    }));
  };

  const addComment = (sceneId: string) => {
    const text = commentInput[sceneId]?.trim();
    if (!text) return;
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => {
        if (s.id !== sceneId) return s;
        return { ...s, comments: [...s.comments, { id: `cmt-${Date.now()}`, user: displayName, text, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) }] };
      })};
    }));
    setCommentInput(prev => ({ ...prev, [sceneId]: "" }));
  };

  const deleteScene = (sceneId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.filter(s => s.id !== sceneId) };
    }));
  };

  const saveScene = (sceneId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => s.id === sceneId ? { ...s, saved: true } : s) };
    }));
  };

  const saveCaption = (sceneId: string, imgId: string) => {
    setEpisodes(prev => prev.map(ep => {
      if (ep.id !== activeEp) return ep;
      return { ...ep, scenes: ep.scenes.map(s => {
        if (s.id !== sceneId) return s;
        return { ...s, images: s.images.map(img => img.id === imgId ? { ...img, caption: captionText } : img) };
      })};
    }));
    setCaptionEditId(null);
    setCaptionText("");
  };

  const toggleEp = (epId: string) => {
    setExpandedEps(prev => { const next = new Set(prev); if (next.has(epId)) next.delete(epId); else next.add(epId); return next; });
    setActiveEp(epId);
  };

  return (
    <div className="dash-font h-screen flex flex-col bg-[hsl(var(--dash-bg))] text-[hsl(var(--dash-text))] overflow-hidden">
      <div className="h-[52px] flex items-center justify-between px-4 bg-[rgba(0,0,0,0.60)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.10)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2196f3] bg-transparent text-xs font-bold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <span className="text-[15px] font-medium tracking-tight">Storyboard</span>
          <span className="text-[11px] text-[hsl(var(--dash-text-4))]">Logged in as <span className="font-bold text-[hsl(var(--dash-text-2))]">{displayName}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${showCaptions ? "border-[#2196f3] text-[#2196f3] bg-[rgba(33,150,243,0.1)]" : "border-[#2196f3]/40 text-[#2196f3]/60 hover:border-[#2196f3]"}`}
          >
            {showCaptions ? <Eye size={13} /> : <EyeOff size={13} />} Captions
          </button>
          <span className="text-[11px] font-bold text-[hsl(var(--dash-text-4))] mr-2">Columns:</span>
          {[3, 4, 5].map(n => (
            <button key={n} onClick={() => setColumns(n)} className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${columns === n ? "bg-[#2196f3] border-[#2196f3] text-white" : "border-[rgba(255,255,255,0.18)] text-[hsl(var(--dash-text-3))] hover:border-[#2196f3]"}`}>{n}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[220px] bg-[hsl(var(--sidebar-background))] border-r border-[rgba(255,255,255,0.09)] overflow-y-auto flex-shrink-0 p-3">
          <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[hsl(var(--dash-text-4))] px-2 mb-2">Episodes</div>
          {episodes.map(ep => (
            <button key={ep.id} onClick={() => toggleEp(ep.id)} className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-[10px] text-sm font-semibold transition-all border mb-1 ${activeEp === ep.id ? "bg-[#2196f3] text-white border-transparent shadow-[0_4px_16px_rgba(33,150,243,0.3)]" : "text-[hsl(var(--dash-text-3))] border-transparent hover:bg-[rgba(33,150,243,0.08)]"}`}>
              {expandedEps.has(ep.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="truncate">Ep {ep.number}: {ep.title}</span>
              <span className="ml-auto text-[10px] opacity-60">{ep.scenes.length}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {activeEpisode && (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-medium tracking-tight">Episode {activeEpisode.number} — {activeEpisode.title}</h2>
                  <p className="text-sm text-[hsl(var(--dash-text-4))] mt-1">{activeEpisode.scenes.length} scene{activeEpisode.scenes.length !== 1 ? "s" : ""} • Drag images to reorder</p>
                </div>
              <button onClick={() => addScene(activeEp)} className="flex items-center gap-2 px-4 py-2.5 border border-[#2196f3] bg-transparent rounded-xl text-sm font-bold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">
                  <Plus size={16} /> New Scene
                </button>
              </div>

              {activeEpisode.scenes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(33,150,243,0.1)] flex items-center justify-center mb-4"><Columns3 size={28} className="text-[#2196f3]" /></div>
                  <h3 className="text-lg font-bold mb-2">No scenes yet</h3>
                  <p className="text-sm text-[hsl(var(--dash-text-4))] mb-4">Click "New Scene" to start building your storyboard</p>
                </div>
              )}

              {activeEpisode.scenes.map(scene => (
                <div key={scene.id} className="mb-6 bg-[hsl(var(--dash-surface))] border border-[rgba(255,255,255,0.09)] rounded-[14px] overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.09)] bg-[hsl(var(--dash-surface2))]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{scene.name}</span>
                      <span className="text-[10px] font-bold text-[hsl(var(--dash-text-4))]">{scene.images.length} image{scene.images.length !== 1 ? "s" : ""}</span>
                      {scene.saved && <span className="text-[10px] font-bold text-green-400">✓ Saved</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => saveScene(scene.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2196f3] text-xs font-semibold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">
                        <Save size={13} /> Save Scene
                      </button>
                      <button onClick={() => { setUploadSceneId(scene.id); fileInputRef.current?.click(); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2196f3] text-xs font-semibold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">
                        <Upload size={13} /> Upload Images
                      </button>
                      <button onClick={() => deleteScene(scene.id)} className="w-7 h-7 rounded-lg border border-[#2196f3] flex items-center justify-center text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">
                        <X size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, scene.id)}>
                      <Droppable droppableId={scene.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-wrap gap-3">
                            {scene.images.map((img, idx) => (
                              <Draggable key={img.id} draggableId={img.id} index={idx}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`relative group rounded-lg overflow-hidden border-2 transition-all ${snapshot.isDragging ? "border-[#2196f3] shadow-[0_0_20px_rgba(33,150,243,0.3)] z-50" : "border-[rgba(255,255,255,0.09)]"}`}
                                    style={{ ...provided.draggableProps.style, width: `calc(${100 / columns}% - ${(columns - 1) * 12 / columns}px)`, ...(snapshot.isDragging ? { zIndex: 9999 } : {}) }}
                                  >
                                    <div {...provided.dragHandleProps} className="absolute top-1 left-1 z-10 w-6 h-6 rounded bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                                      <GripVertical size={12} className="text-white" />
                                    </div>
                                    <button onClick={() => removeImage(scene.id, img.id)} className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[hsl(var(--dash-red))]">
                                      <X size={11} className="text-white" />
                                    </button>
                                    {/* Caption note button */}
                                    <button
                                      onClick={() => { setCaptionEditId(img.id); setCaptionText(img.caption || ""); }}
                                      className="absolute bottom-1 right-1 z-10 w-6 h-6 rounded bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#2196f3]"
                                    >
                                      <StickyNote size={11} className="text-white" />
                                    </button>
                                    <img src={img.url} alt="" className="w-full aspect-video object-cover" />
                                    {/* Caption overlay */}
                                    {showCaptions && img.caption && (
                                      <div className="absolute inset-0 bg-black/40 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-[11px] px-2 py-1.5 w-full leading-snug">{img.caption}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    {scene.images.length === 0 && (
                      <div onClick={() => { setUploadSceneId(scene.id); fileInputRef.current?.click(); }} className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[rgba(255,255,255,0.12)] rounded-xl cursor-pointer hover:border-[#2196f3] transition-colors">
                        <Upload size={24} className="text-[hsl(var(--dash-text-4))] mb-2" />
                        <span className="text-sm text-[hsl(var(--dash-text-4))]">Click to upload images</span>
                      </div>
                    )}
                  </div>

                  {/* Caption edit modal inline */}
                  {captionEditId && scene.images.some(img => img.id === captionEditId) && (
                    <div className="px-4 pb-3 border-t border-[rgba(255,255,255,0.06)] pt-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <StickyNote size={13} className="text-[#2196f3]" />
                        <span className="text-[11px] font-bold text-[hsl(var(--dash-text-4))] uppercase tracking-wider">Add Caption</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          value={captionText}
                          onChange={e => setCaptionText(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && saveCaption(scene.id, captionEditId)}
                          placeholder="Describe what's happening in this frame..."
                          className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)] rounded-lg px-3 py-2 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[#2196f3] placeholder:text-[hsl(var(--dash-text-4))]"
                          autoFocus
                        />
                        <button onClick={() => saveCaption(scene.id, captionEditId)} className="px-3 py-2 border border-[#2196f3] rounded-lg text-xs font-bold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">Save</button>
                        <button onClick={() => setCaptionEditId(null)} className="px-3 py-2 border border-[#2196f3]/40 rounded-lg text-xs font-semibold text-[#2196f3]/60 hover:border-[#2196f3] hover:text-[#2196f3] transition-all">Cancel</button>
                      </div>
                    </div>
                  )}

                  <div className="px-4 pb-4 border-t border-[rgba(255,255,255,0.06)] pt-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MessageSquare size={13} className="text-[hsl(var(--dash-text-4))]" />
                      <span className="text-[11px] font-bold text-[hsl(var(--dash-text-4))] uppercase tracking-wider">Notes & Comments</span>
                    </div>
                    {scene.comments.map(c => (
                      <div key={c.id} className="flex gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2196f3] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5">{c.user[0].toUpperCase()}</div>
                        <div>
                          <div className="flex items-center gap-2"><span className="text-xs font-bold">{c.user}</span><span className="text-[10px] text-[hsl(var(--dash-text-4))]">{c.date}</span></div>
                          <p className="text-sm text-[hsl(var(--dash-text-2))] mt-0.5">{c.text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input
                        value={commentInput[scene.id] || ""}
                        onChange={e => setCommentInput(prev => ({ ...prev, [scene.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && addComment(scene.id)}
                        placeholder={`Comment as ${displayName}...`}
                        className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.18)] rounded-lg px-3 py-2 text-sm text-[hsl(var(--dash-text))] outline-none focus:border-[#2196f3] placeholder:text-[hsl(var(--dash-text-4))]"
                      />
                      <button onClick={() => addComment(scene.id)} className="px-3 py-2 border border-[#2196f3] rounded-lg text-xs font-bold text-[#2196f3] hover:bg-[rgba(33,150,243,0.1)] transition-all">Post</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { if (uploadSceneId) handleImageUpload(e.target.files, uploadSceneId); e.target.value = ""; }} />
    </div>
  );
};

export default StoryboardPage;
