import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'

const CreatePage = () => {
    const { user } = useContext(AuthContext);
    const { words, setWords } = useState(['']);
    const { hints, setHints } = useState(['']);
    const formatWords = (e) => {
        var lines = e.target.words.values.split('\n');
        var wordLst = [];
        var hintLst = [];
        for (let i=0; i<lines.length; i++) {
            let line = lines[i].split(":");
            wordLst.append(line[0]);
            hintLst.append(line[1]);
        }
        setWords(wordLst);
        setHints(hintLst);
    }
    const adjCheck = (lst, segment, segmentIndex, row, col) => {
        return 0
    }
    const placeWord = (lst, word, wordIndex, row, col) => {
        var mode = 0;
        var currRow = row;
        var currCol = col;
        console.log(currRow);
        /* check vert/hori: 1 = vert, 2 = hori */
        if ((currCol == 0 && !lst[currRow][currCol+1]) || (currCol == len(lst[0])-1 && !lst[currRow][currCol-1])) {
            mode = 1;
        } else if (!lst[currRow][currCol+1] && !lst[currRow][currCol-1]) {
            mode = 1;
        }
        if ((currRow == 0 && !lst[currRow+1][currCol]) || (currCol == len(lst)-1 && !lst[currRow-1][currCol])) {
            mode = 2;
        } else if (!lst[currRow+1][currCol] && !lst[currRow-1][currCol]) {
            mode = 2;
        }
        if (!mode) {
            return lst
        }
        var newLst = lst.copy();
        var success = false;
        for (let i=0; i<word.length; i++) {
            let distFromIndex = wordIndex-i;
            if (distFromIndex == 0) {
                continue;
            } else if (distFromIndex > 0) {
                if (mode == 1) {
                    if (currCol-distFromIndex >= 0) {
                        newLst[currRow][currCol-distFromIndex] = word[i];
                    } else {
                        for (let j=0; j<newLst[0].length; j++) {
                            currCol++;
                            if (j != currRow) {
                                newLst[j].insert(0, "");
                            } else {
                                newLst[j].insert(currCol-1, word[i]);
                            }
                        }
                    }
                } else {
                    if (currRow+distFromIndex < newLst.length) {
                        newLst[currRow+distFromIndex][currCol] = word[i];
                    } else {
                        for (let j=0; j<newLst.length; j++) {
                            if (j != currCol) {
                                return 0
                                /*  I WNN DIE */
                            }
                        }
                    }
                }
            } else {
                distFromIndex = Math.abs(distFromIndex);
                if (currCol+distFromIndex < newLst[0].length) {
                    newLst[currRow][currCol+distFromIndex] = word[i];
                } else {
                    for (let j=0; j<newLst[0].length; j++) {
                        if (j != currRow) {
                            newLst[j].append("");
                        } else {
                            newLst[j].append(word[i]);
                        }
                    }
                }
            }
        }
        if (success) {
            return newLst;
        } else {
            return lst;
        }
    }
    const formulateCrossword = (e) => {
        e.preventDefault();
        formatWords(e);
        let layout = [words[0].split('')];
        for (let i=1; i<words.length; i++) {
            if (!words[i]) {
                continue
            }
            for (let j=0; j<words[i].length; j++) {
                for (let k=0; k<layout.length; k++) {
                    var pos = [k, layout[k].findIndex(words[i][j])]
                    if (layout[k].findIndex(words[i][j]) != -1) {
                        layout = placeWord(layout, words[i], i, pos[0], pos[1]);
                    }
                }
            }
        }
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