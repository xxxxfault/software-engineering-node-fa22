import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for bookmarks related data access object methods
 */
export default interface BookmarkDaoI  {
    findAllTuitsBookmaredByUser (tid: string, uid: string): Promise<Bookmark[]>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
};