
////////////////////////////////////////////////////////////
function getVall() {
    var course1 = document.getElementById("course1").value;
    var course2 = document.getElementById("course2").value;
    var course3 = document.getElementById("course3").value;
    var course4 = document.getElementById("course4").value;
    var course5 = document.getElementById("course5").value;
    var course6 = document.getElementById("course6").value;
    var course7 = document.getElementById("course7").value;
    var course8 = document.getElementById("course8").value;
    var GpaSum = parseInt(+course1) + parseInt(+course2) + parseInt(+course3) + parseInt(+course4) + parseInt(+course5) + parseInt(+course6) + parseInt(+course7) + parseInt(+course8);
    // console.log(+GpaSum);



    var Points1 = document.getElementById("Points1").value;
    var Points2 = document.getElementById("Points2").value;
    var Points3 = document.getElementById("Points3").value;
    var Points4 = document.getElementById("Points4").value;
    var Points5 = document.getElementById("Points5").value;
    var Points6 = document.getElementById("Points6").value;
    var Points7 = document.getElementById("Points7").value;
    var Points8 = document.getElementById("Points8").value;
    var PointsSum = parseInt(+Points1) + parseInt(+Points2) + parseInt(+Points3) + parseInt(+Points4) + parseInt(+Points5) + parseInt(+Points6) + parseInt(+Points7) + parseInt(+Points8)
        // console.log(+PointsSum);


    let Points1De = document.getElementById("Points1").value
    let Points2De = document.getElementById("Points2").value
    let Points3De = document.getElementById("Points3").value
    let Points4De = document.getElementById("Points4").value
    let Points5De = document.getElementById("Points5").value
    let Points6De = document.getElementById("Points6").value
    let Points7De = document.getElementById("Points7").value
    let Points8De = document.getElementById("Points8").value

    var totalValue = 0
    if (Points1De != 0) {
        totalValue += 100
    }
    if (Points2De != 0) {
        totalValue += 100
    }
    if (Points3De != 0) {
        totalValue += 100
    }
    if (Points4De != 0) {
        totalValue += 100
    }
    if (Points5De != 0) {
        totalValue += 100
    }
    if (Points6De != 0) {
        totalValue += 100
    }
    if (Points7De != 0) {
        totalValue += 100
    }

    if (Points8De != 0) {
        totalValue += 100
    }



    var course1N = course1 * ((Points1 - 50) * 0.06 + 1);
    var course2N = course2 * ((Points2 - 50) * 0.06 + 1);
    var course3N = course3 * ((Points3 - 50) * 0.06 + 1);
    var course4N = course4 * ((Points4 - 50) * 0.06 + 1);
    var course5N = course5 * ((Points5 - 50) * 0.06 + 1);
    var course6N = course6 * ((Points6 - 50) * 0.06 + 1);
    var course7N = course7 * ((Points7 - 50) * 0.06 + 1);
    var course8N = course8 * ((Points8 - 50) * 0.06 + 1);


    var Student1Gpa = (course1N) + (course2N) + (course3N) + (course4N) + (course5N) + (course6N) + (course7N) + (course8N);


    var StudentGpa = ((Student1Gpa)) / (GpaSum);

    var grade = StudentGpa;
    var letterGrade;

    if (grade >= 3.7 && grade <= 4) {
        letterGrade = 'A+ ممتاز مرتفع'
    } else if (grade >= 3.4 && grade <= 3.7) {
        letterGrade = 'A ممتاز'
    } else if (grade >= 3.1 && grade <= 3.4) {
        letterGrade = 'A- ممتاز منخفض'
    } else if (grade >= 2.8 && grade <= 3.1) {
        letterGrade = 'B+ جيد جدا مرتفع'
    } else if (grade >= 2.5 && grade <= 2.8) {
        letterGrade = 'B جيد جدا'
    } else if (grade >= 2.2 && grade <= 2.5) {
        letterGrade = 'C+ جيد مرتفع'
    } else if (grade >= 1.9 && grade <= 2.2) {
        letterGrade = 'C جيد'
    } else if (grade >= 1.6 && grade <= 1.9) {
        letterGrade = 'D+ مقبول مرتفع'
    } else if (grade >= 1.3 && grade <= 1.6) {
        letterGrade = 'D مقبول'
    } else if (grade >= 1 && grade <= 1.3) {
        letterGrade = 'D- مقبول منخفض'
    } else if (grade < 1) {
        letterGrade = 'F راسب'
    };

    var percent = PointsSum * 100 / totalValue
    let firstGpa = document.getElementById("firstGpa").value
    let firstHours = document.getElementById("firstHours").value
    let SummerGpa = document.getElementById("SummerGpa").value
    let summerHours = document.getElementById("summerHours").value

    if (firstGpa != "" & firstHours != "") {
        var FinalGpa = ((firstGpa * parseInt(+firstHours)) + (StudentGpa.toFixed(2) * GpaSum) + (SummerGpa * parseInt(+summerHours))) / (parseInt(+firstHours) + GpaSum + parseInt(+summerHours))
    }


    var ggrade = FinalGpa;
    var letterrGrade;

    if (ggrade >= 3.7 && ggrade <= 4) {
        letterrGrade = 'A+ ممتاز مرتفع'
    } else if (ggrade >= 3.4 && ggrade <= 3.7) {
        letterrGrade = 'A ممتاز'
    } else if (ggrade >= 3.1 && ggrade <= 3.4) {
        letterrGrade = 'A- ممتاز منخفض'
    } else if (ggrade >= 2.8 && ggrade <= 3.1) {
        letterrGrade = 'B+ جيد جدا مرتفع'
    } else if (ggrade >= 2.5 && ggrade <= 2.8) {
        letterrGrade = 'B جيد جدا'
    } else if (ggrade >= 2.2 && ggrade <= 2.5) {
        letterrGrade = 'C+ جيد مرتفع'
    } else if (ggrade >= 1.9 && ggrade <= 2.2) {
        letterrGrade = 'C جيد'
    } else if (ggrade >= 1.6 && ggrade <= 1.9) {
        letterrGrade = 'D+ مقبول مرتفع'
    } else if (ggrade >= 1.3 && ggrade <= 1.6) {
        letterrGrade = 'D مقبول'
    } else if (ggrade >= 1 && ggrade <= 1.3) {
        letterrGrade = 'D- مقبول منخفض'
    } else if (ggrade < 1) {
        letterrGrade = 'F راسب'
    };



    Swal.fire(
        `${"Total Points"} (${totalValue})
${"Your Points"} (${PointsSum})
${"Percentage"} (${percent.toFixed(2)}${"%"})
${"GPA"} (${StudentGpa.toFixed(2)})
${"Grade"} (${letterGrade})
////////////////////
${"Final GPA"} (${Number(FinalGpa).toFixed(2)})
${"Final Grade"} (${letterrGrade})
${"Whatever result is⟹😍Never mind,You did well😍"}
         `)

}

document.onkeydown = function(e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'c'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 's'.charCodeAt(0))) {
        return false;
    }
}

///////////////////////////////////////////////////////////////
