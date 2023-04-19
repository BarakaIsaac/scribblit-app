import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Alert from 'react-alert';
import Modal from 'react-modal';
import TagFormContainer from './tags/tag_form_container';
import NotebookSelectContainer from './notebooks/notebook_select_container';
import DeleteNotePrompt from './delete_note_prompt';
import { DeleteModalStyle } from '../modal_styles/delete_modal_style';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentNote.title || '',
      body: this.props.currentNote.body || '',
      deleteModalOpen: false
    };
    this.currentDelta = null;
    this.saveTimer = null;
    this.modules = {
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          'image': this.handleImageUpload
        }
      }
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.autoSave = this.autoSave.bind(this);
  }

  clearTimer() {
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
  }

  autoSave() {
    this.props.updateNote({
      id: this.props.currentNote.id,
      title: this.state.title,
      body: this.state.body
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(content, delta) {
    this.clearTimer();
    if (this.currentDelta === null || this.currentDelta !== delta) {
      this.setState({ body: content, currentDelta: delta });
      this.saveTimer = setTimeout(this.autoSave, 1000);
    }
  }

  handleSave() {
    this.props.updateNote({
      id: this.props.currentNote.id,
      title: this.state.title,
      body: this.state.body
    });
  }

  handleDelete() {
    this.props.deleteNote(this.props.currentNote.id);
  }

  openDeleteModal() {
    this.setState({ deleteModalOpen: true });
  }

  closeDeleteModal() {
    this.setState({ deleteModalOpen: false });
  }

  handleImageUpload() {
    // handle image upload logic here
  }

  renderUser() {
    if (this.props.currentUser) {
      return (
        <div className="current-user-info">LOGGED IN AS: {this.props.currentUser.username}</div>
      );
    }
  }

  render() {
    const { noteCount, currentNote } = this.props;
    const { title, body, deleteModalOpen } = this.state;

    if (noteCount === 0) {
      return (
        <div className="note-container-empty">
          {this.renderUser()}
          <img src={window.notearyAssets.loadingNotebook} />
        </div>
      );
    }

    return (
      <div className='note-container'>
        {this.renderUser()}
        <div className="note-header-container">
          <input
            className="note-title-form"
            type='text'
            placeholder='Title your note'
            onChange={this.handleTitleChange}
            value={title}
          />
        </div>

        <div className="note-tools-container">
          <div className="form-save-container">
            <button
              className="form-save-button"
              onClick={this.handleSave}
            />
            <div className="save-tool-tooltip">SAVE</div>
                </div>
                  <div className="form-delete-container">
              <button
                className="form-delete-button"
                onClick={ this.openDeleteModal }></button>
              <div className="delete-tool-tooltip">DELETE</div>
            </div>

            <div className="form-notebooks-container">
              <div className="form-notebooks-button"></div>
              <div className="notebooks-tool-tooltip">NOTEBOOKS</div>
            </div>

            <NotebookSelectContainer />

            <div className="form-tags-container">
              <div className="form-tags-button"></div>
              <div className="tags-tool-tooltip">TAGS</div>
            </div>

            <TagFormContainer
              note={ this.props.currentNote }/>
          </div>

          <div className="note-form-container">
            <ReactQuill
              theme='snow'
              modules={this.modules}
              value={this.state.body}
              onChange={this.handleBodyChange}
              ref={editor => { this.editor = editor; }}
              getText={this.getText}></ReactQuill>
          </div>

          <Modal
            isOpen={this.state.deleteModalOpen}
            onRequestClose={this.closeDeleteModal}
            style={ DeleteModalStyle }>

            <DeleteNotePrompt
              deleteNote={this.handleDelete}
              closeModal={this.closeDeleteModal}/>
          </Modal>

        </div>
      );
    }
  }

export default Note;

