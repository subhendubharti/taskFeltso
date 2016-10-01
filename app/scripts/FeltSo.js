function getMonthInteger(mon){
    var monStr=mon.toLowerCase();
    if("january".indexOf(monStr)>-1){
        return 0;
    }
    if("february".indexOf(monStr)>-1){
        return 1;
    }
    if("march".indexOf(monStr)>-1){
        return 2;
    }
    if("april".indexOf(monStr)>-1){
        return 3;
    }
    if("may".indexOf(monStr)>-1){
        return 4;
    }
    if("june".indexOf(monStr)>-1){
        return 5;
    }
    if("july".indexOf(monStr)>-1){
        return 6;
    }
    if("august".indexOf(monStr)>-1){
        return 7;
    }
    if("september".indexOf(monStr)>-1){
        return 8;
    }
    if("october".indexOf(monStr)>-1){
        return 9;
    }
    if("november".indexOf(monStr)>-1){
        return 10;
    }
    if("december".indexOf(monStr)>-1){
        return 11;
    }
}