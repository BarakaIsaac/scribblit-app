import React, { useState, useCallback, useEffect } from 'react';
import Drawer from 'react-motion-drawer';
import NotebookListContainer from './notebooks/notebook_list_container';
import TagsListContainer from './tags/tags_list_container';

function SideBar(props) {
  const [notebookDrawerOpen, setNotebookDrawerOpen] = useState(false);
  const [tagsDrawerOpen, setTagsDrawerOpen] = useState(false);

  const toggleNotebookDrawer = useCallback(() => {
    setNotebookDrawerOpen(open => !open);
  }, []);

  const closeNotebookDrawer = useCallback(() => {
    setNotebookDrawerOpen(false);
  }, []);

  const toggleTagsDrawer = useCallback(() => {
    setTagsDrawerOpen(open => !open);
  }, []);

  const closeTagsDrawer = useCallback(() => {
    setTagsDrawerOpen(false);
  }, []);

  const handleAddNote = useCallback(e => {
    let notebookId = props.notebooks[0].id;
    if (props.currentNotebook) {
      notebookId = props.currentNotebook.id;
    }
    const defaultNote = { title: '', body: '<p><br></p>', notebook_id: `${notebookId}` };
    props.createNote(defaultNote);
    alert.success('Notebook Created');
  }, [props]);

  const handleNotes = useCallback(e => {
    props.switchNotebook(null);
    props.switchTag(null);
  }, [props]);

  const handleNotebooks = useCallback(e => {
    toggleNotebookDrawer();
  }, [toggleNotebookDrawer]);

  const handleTags = useCallback(e => {
    toggleTagsDrawer();
  }, [toggleTagsDrawer]);

  const handleLogout = useCallback(e => {
    props.logout();
  }, [props]);

  useEffect(() => {
    if (props.notes.length > props.notes.length) {
      props.switchNote(props.notes[0]);
    }
  }, [props.notes, props.switchNote]);

  const style = {
    background: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px'
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo"></div>

      <div className="newnote-button-container">
        <button className="sidebar-newnote-button" onClick={handleAddNote}></button>
        <div className="newnote-button-tooltip">NEW NOTE</div>
      </div>

      <div className="notes-button-container">
        <button className="sidebar-notes-button" onClick={handleNotes}></button>
        <div className="notes-button-tooltip">ALL NOTES</div>
      </div>

      <div className="notebooks-button-container">
        <button className="sidebar-notebooks-button" onClick={handleNotebooks}></button>
        <div className="notebooks-button-tooltip">NOTEBOOKS</div>
      </div>

      <div className="tags-button-container">
        <button className="sidebar-tags-button" onClick={handleTags}></button>
        <div className="tags-button-tooltip">TAGS</div>
      </div>

      <div className="logout-button-container">
          <button className="sidebar-logout-button" onClick={handleLogout}></button>
          <div className="logout-button-tooltip">LOG OUT</div>
        </div>

        <Drawer
          className="notebooks-drawer"
          drawerStyle={style}
          open={notebookDrawerOpen}
          onChange={open => ({ notebookDrawerOpen: open})}
          width={420}>
          <NotebookListContainer closeNotebookDrawer={ closeNotebookDrawer }/>
        </Drawer>

        <Drawer
          className="tags-drawer"
          drawerStyle={style}
          open={tagsDrawerOpen}
          onChange={open => ({ tagsDrawerOpen: open})}
          width={420}>
          <TagsListContainer closeTagsDrawer={ closeTagsDrawer }/>
        </Drawer>

      </div>
    );
  }

export default SideBar;
