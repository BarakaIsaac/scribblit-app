import React, { useState } from "react";
import Moment from "moment";
import Modal from "react-modal";
import DeleteNotePrompt from "./delete_note_prompt";
import { DeleteModalStyle } from "../modal_styles/delete_modal_style";

const NoteListItem = (props) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleSelectNote = (e) => {
    if (props.currentNote) {
      if (props.note.id !== props.currentNote.id) {
        props.switchNote(props.note);
      }
    }
  };

  const handleDelete = (e) => {
    props.destroyNote(props.note);
    if (props.note.id === props.currentNote.id) {
      props.switchNote(null);
    }
    closeDeleteModal();
  };

  const renderTitle = () => {
    if (props.note.title === "") {
      return <div className="empty-title">Untitled Note</div>;
    } else {
      let title = props.note.title;
      if (title.length > 20) {
        title = title.slice(0, 20) + "...";
      }
      return <div>{title}</div>;
    }
  };

  const renderBodyText = () => {
    const body = document.createElement("div");
    body.innerHTML = props.note.body;
    // const bodyText = body.firstChild ? body.firstChild.textContent : body.textContent;
    const bodyText = body.textContent;
    return bodyText;
  };

  let selected = "note-item-li";
  if (props.currentNote) {
    if (props.note.id === props.currentNote.id) {
      selected += " selected";
    }
  }

  return (
    <li className={selected} onClick={handleSelectNote}>
      <div className="note-item-title">
        {renderTitle()}
        <button
          className="delete-note-button"
          onClick={openDeleteModal}
        ></button>
      </div>
      <div className="last-updated">
        {Moment(props.note.updated_at).fromNow()}
      </div>
      <div className="note-item-body">{renderBodyText()}</div>

      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={DeleteModalStyle}
      >
        <DeleteNotePrompt
          deleteNote={handleDelete}
          closeModal={closeDeleteModal}
        />
      </Modal>
    </li>
  );
};

export default NoteListItem;
