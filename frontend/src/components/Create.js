import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext'

const CreatePage = () => {
    const { user } = useContext(AuthContext);
    var wordLst = [];
    var hintLst = [];
    var layout = [[]];
    const copyList = (lst) => {
        let newLst = [];
        for (let i = 0; i < lst.length; i++) {
            newLst.push(lst[i]);
        }
        return newLst;
    }
    const formatWords = (e) => {
        e.preventDefault();
        layout = [[]];
        wordLst = [];
        hintLst = [];
        var lines = e.target.words.value.split('\n');
        for (let i=0; i<lines.length; i++) {
            let line = lines[i].split(":");
            wordLst.push(line[0].toLowerCase());
            hintLst.push(line[1].toLowerCase());
        }
    }
    const adjCheck = (lst, segment, segmentIndex, row, col) => {
        return 0
    }
    const placeWord = (lst, word, wordIndex, row, col) => {
        var mode = 0;
        var currRow = row;
        var currCol = col;
        if (lst.length > 1) {
            if ((currCol === 0 && !lst[currRow][currCol+1]) || (currCol === lst[0].length-1 && !lst[currRow][currCol-1])) {
                mode = 1;
            } else if (!lst[currRow][currCol+1] && !lst[currRow][currCol-1]) {
                mode = 1;
            } else if ((currRow === 0 && !lst[currRow+1][currCol]) || (currCol === lst.length-1 && !lst[currRow-1][currCol])) {
                mode = 2;
            } else if (!lst[currRow+1][currCol] && !lst[currRow-1][currCol]) {
                mode = 2;
            } else {
                return lst
            }
        } else {
            mode = 1;
        }
        console.log(mode);
        console.log(lst);
        var newLst = copyList(lst);
        console.log(lst);
        for (let i=0; i<word.length; i++) {
            let distFromIndex = wordIndex-i;
            if (distFromIndex === 0) {
                continue;
            } else if (distFromIndex > 0) {
                if (mode === 1) {
                    if (currCol-distFromIndex >= 0) {
                        newLst[currRow][currCol-distFromIndex] = word[i];
                    } else {
                        for (let j=0; j<newLst.length; j++) {
                            currCol++;
                            if (j !== currRow) {
                                console.log(newLst[j]);
                                newLst[j].insert(0, "");
                            } else {
                                newLst[j].splice(currCol-1, 0, word[i]);
                            }
                        }
                    }
                } else {
                    if (currRow-distFromIndex >= 0) {
                        newLst[currRow-distFromIndex][currCol] = word[i];
                    } else {
                        currRow++;
                        let emptyLst = []
                        for (let j=0; j<newLst[0].length; j++) {
                            if (j !== currCol) {
                                emptyLst += "";
                            } else {
                                emptyLst += word[i];
                            }
                        }
                        newLst.splice(0, 0, emptyLst);
                    }
                }
            } else {
                distFromIndex = Math.abs(distFromIndex);
                if (mode === 1) {
                    if (currCol+distFromIndex < newLst[0].length) {
                        newLst[currRow][currCol+distFromIndex] = word[i];
                    } else {
                        console.log(word);
                        for (let j=0; j<newLst.length; j++) {
                            console.log(j);
                            if (j !== currRow) {
                                console.log(newLst[j]);
                                newLst[j].push("");
                            } else {
                                console.log(newLst);
                                console.log(newLst[j]);
                                newLst[j].push(word[i]);
                            }
                        }
                    }
                } else {
                    if (currRow+distFromIndex < newLst.length) {
                        newLst[currRow+distFromIndex][currCol] = word[i];
                    } else {
                        let emptyLst = []
                        for (let j=0; j<newLst[0].length; j++) {
                            if (j !== currCol) {
                                emptyLst += "";
                            } else {
                                emptyLst += word[i];
                            }
                        }
                        newLst.push(emptyLst);
                    }
                }
            }
        }
        return newLst;
    }
    const formulateCrossword = (e) => {
        e.preventDefault();
        formatWords(e);
        console.log(wordLst);
        console.log(wordLst[0]);
        for (let i=0; i<wordLst[0].length; i++) {
            console.log(wordLst[0]);
            console.log(wordLst[0][i]);
            layout[0].push(wordLst[0][i]);
            console.log(layout[0]);
            console.log(layout);
        }
        console.log(layout);
        let placedWord = false;
        for (let i=1; i<wordLst.length; i++) {
            placedWord = false;
            if (!wordLst[i]) {
                continue;
            }
            for (let j=0; j<layout.length; j++) {
                for (let k=0; k<wordLst[i].length; k++) {
                    console.log(wordLst[i]);
                    var pos = [j, layout[j].indexOf(wordLst[i][k])]
                    if (layout[j].indexOf(wordLst[i][k]) !== -1) {
                        let ogLst = layout;
                        console.log(layout);
                        layout = placeWord(layout, wordLst[i], i, pos[0], pos[1]);
                        console.log(layout);
                        if (ogLst !== layout) {
                            placedWord = true;
                            break;
                        }
                    }
                    console.log(layout);
                }
                if (placedWord) {
                    break;
                }
            }
        }
        console.log(layout);
    }
    return (
        <div>
            <form onSubmit={formulateCrossword}>
                <div className="form-group">
                    <label>Words</label>
                    <textarea className="form-control"  
                    placeholder="Write in the following format
                    (word): (hint)" name="words" />
                </div>
                <button type="submit" className="btn btn-primary" />
            </form>
        </div>
    );
}
export default CreatePage;