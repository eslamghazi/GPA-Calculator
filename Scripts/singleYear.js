function getVall() {
    // اجلب القيم من الحقول
    const hours = Array.from(document.getElementsByName('courseHours')).map(input => Number(input.value) || 0);
    const scores = Array.from(document.getElementsByName('courseScore')).map(input => Number(input.value) || 0);
    let invalidInput = false;
    for (let i = 0; i < hours.length; i++) {
        let hour = hours[i];
        let score = scores[i];
        if ((hour > 0 && score === 0) || (score > 0 && hour === 0)) {
            Swal.fire(`يجب إدخال كل من الساعات والدرجة للمادة رقم ${i+1}`);
            invalidInput = true;
            break;
        }
        if (score > 100) {
            Swal.fire(`الدرجة للمادة رقم ${i+1} يجب ألا تزيد عن 100.`);
            invalidInput = true;
            break;
        }
        if (hour > 20) {
            Swal.fire(`الساعات للمادة رقم ${i+1} يجب ألا تزيد عن 20.`);
            invalidInput = true;
            break;
        }
        if (score < 0) {
            Swal.fire(`الدرجة للمادة رقم ${i+1} يجب ألا تقل عن 0.`);
            invalidInput = true;
            break;
        }
        if (hour < 0) {
            Swal.fire(`الساعات للمادة رقم ${i+1} يجب ألا تقل عن 0.`);
            invalidInput = true;
            break;
        }
    }
    if (invalidInput) return;
    console.log('hours:', hours);
    console.log('scores:', scores);

    // تحقق من وجود بيانات صالحة
    const validCourses = hours.filter((h, i) => h > 0 && scores[i] > 0);
    if (validCourses.length === 0) {
        Swal.fire('يرجى إدخال ساعات ودرجات مادة واحدة على الأقل لحساب المعدل التراكمي');
        return;
    }

    // دالة تحويل الدرجة إلى معدل 4
    function scoreToGpa(score) {
        if (score >= 90) return 4.0;
        if (score >= 85) return 3.7;
        if (score >= 80) return 3.3;
        if (score >= 75) return 3.0;
        if (score >= 70) return 2.7;
        if (score >= 65) return 2.3;
        if (score >= 60) return 2.0;
        if (score >= 55) return 1.7;
        if (score >= 50) return 1.0;
        return 0.0;
    }

    // دالة تحويل المعدل إلى درجة من 100
    function gpaToMark(gpa) {
        if (gpa >= 4.0) return 95;
        if (gpa >= 3.7) return 90;
        if (gpa >= 3.3) return 85;
        if (gpa >= 3.0) return 80;
        if (gpa >= 2.7) return 75;
        if (gpa >= 2.3) return 70;
        if (gpa >= 2.0) return 65;
        if (gpa >= 1.7) return 60;
        if (gpa >= 1.0) return 50;
        return 0;
    }

    // دالة تحويل الدرجة إلى التقدير
    function markToLetter(score) {
        if (score >= 90) return 'A+ ممتاز مرتفع';
        if (score >= 85) return 'A ممتاز';
        if (score >= 80) return 'A- ممتاز منخفض';
        if (score >= 75) return 'B+ جيد جدا مرتفع';
        if (score >= 70) return 'B جيد جدا';
        if (score >= 65) return 'C+ جيد مرتفع';
        if (score >= 60) return 'C جيد';
        if (score >= 55) return 'D+ مقبول مرتفع';
        if (score >= 50) return 'D مقبول';
        if (score >= 45) return 'D- مقبول منخفض';
        return 'F راسب';
    }

    // احسب مجموع الساعات
    const totalHours = hours.reduce((sum, h) => sum + h, 0);
    // احسب مجموع (معدل كل مادة * ساعاتها)
    const weightedSum = hours.reduce((sum, h, i) => sum + h * scoreToGpa(scores[i]), 0);

    // حساب مواد الترم الحالي
    const termRows = document.querySelectorAll('#terms-container .term-row');
    let otherHours = 0;
    let otherWeighted = 0;
    for (let i = 0; i < termRows.length; i++) {
        const row = termRows[i];
        const h = Number(row.querySelector('input[name="termHours"]').value) || 0;
        let gpa = row.querySelector('input[name="termGpa"]').value;
        const type = row.querySelector('select[name="termType"]').value;
        // Validation: if any field is filled, all must be filled
        if (h > 0 || gpa || type) {
            if (!h || !gpa || !type) {
                Swal.fire(`يرجى إدخال جميع بيانات الفصل رقم ${i+1}`);
                return;
            }
            gpa = Number(gpa);
            if (h > 50) {
                Swal.fire(`ساعات الفصل رقم ${i+1} يجب ألا تزيد عن 50.`);
                return;
            }
            if (h < 1) {
                Swal.fire(`ساعات الفصل رقم ${i+1} يجب أن تكون 1 على الأقل.`);
                return;
            }
            if (gpa > 4) {
                Swal.fire(`معدل الفصل رقم ${i+1} يجب ألا يزيد عن 4.`);
                return;
            }
            if (gpa < 0) {
                Swal.fire(`معدل الفصل رقم ${i+1} يجب ألا يقل عن 0.`);
                return;
            }
            // إذا كان صيفي والمعدل 4 (أو الدرجة كاملة)، احسبه 60/100
            if (type === 'summer' && gpa === 4) {
                gpa = scoreToGpa(60); // أي 2.0
            }
            otherHours += h;
            otherWeighted += h * gpa;
        }
    }
    const allHours = totalHours + otherHours;
    const allWeighted = weightedSum + otherWeighted;
    if (allHours === 0) {
        Swal.fire('يرجى إدخال ساعات ودرجات المواد أو الفصول لحساب المعدل التراكمي');
        return;
    }
    let gpa = allWeighted / allHours;
    gpa = Math.max(0, Math.min(gpa, 4));
    const mark = gpaToMark(gpa);
    let letterGrade = '';
    if (gpa >= 3.7 && gpa <= 4) {
        letterGrade = 'A+ ممتاز مرتفع';
    } else if (gpa >= 3.4 && gpa < 3.7) {
        letterGrade = 'A ممتاز';
    } else if (gpa >= 3.1 && gpa < 3.4) {
        letterGrade = 'A- ممتاز منخفض';
    } else if (gpa >= 2.8 && gpa < 3.1) {
        letterGrade = 'B+ جيد جدا مرتفع';
    } else if (gpa >= 2.5 && gpa < 2.8) {
        letterGrade = 'B جيد جدا';
    } else if (gpa >= 2.2 && gpa < 2.5) {
        letterGrade = 'C+ جيد مرتفع';
    } else if (gpa >= 1.9 && gpa < 2.2) {
        letterGrade = 'C جيد';
    } else if (gpa >= 1.6 && gpa < 1.9) {
        letterGrade = 'D+ مقبول مرتفع';
    } else if (gpa >= 1.3 && gpa < 1.6) {
        letterGrade = 'D مقبول';
    } else if (gpa >= 1 && gpa < 1.3) {
        letterGrade = 'D- مقبول منخفض';
    } else if (gpa < 1) {
        letterGrade = 'F راسب';
    } else {
        letterGrade = 'غير متوفر';
    }
    const totalMarks = scores.reduce((sum, s) => sum + s, 0);
    const maxMarks = scores.length * 100;
    const percent = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
    const hasFail = scores.some(s => s < 60);
    let failSubjects = [];
    const subjectNames = Array.from(document.getElementsByName('subjectName')).map(input => input.value.trim());
    scores.forEach((s, i) => {
      if (s < 60) failSubjects.push(i);
    });
    let failMsg = '';
    if (failSubjects.length > 0) {
      failMsg = '<hr>' + failSubjects.map(idx => {
        const name = subjectNames[idx] ? `(${subjectNames[idx]})` : '';
        return `<div style=\"color:#c00;font-weight:bold;direction:rtl;\">المادة رقم ${idx+1} ${name}: قد تعتبر راسباً بها.</div>`;
      }).join('');
    }
    Swal.fire({
      html: `
        <div style=\"direction: rtl; font-size: 1.2em;\">
          <b>المعدل التراكمي:</b> ${gpa.toFixed(2)}<br>
          <b>مجموع الدرجات:</b> ${totalMarks} / ${maxMarks} <br>
          <b>النسبة المئوية:</b> ${percent.toFixed(2)}% <br>
          <b>التقدير النهائي (معدل):</b> ${letterGrade}
        </div>
        ${failMsg}
      `
    });
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

// منع إعادة تحميل الصفحة عند الإرسال
// (يمكنك إضافة نفس مستمع الحدث كما في multipleYears.js إذا رغبت)
document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      getVall();
    });
  }
  // إضافة وإزالة مواد ديناميكيًا مع تحديث الترقيم
  const maxSubjects = 8;
  function updateSubjectLabels() {
    const rows = document.querySelectorAll('#subjects-container .subject-row');
    rows.forEach((row, idx) => {
      let label = row.querySelector('label');
      if (!label) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'col-12 mb-1';
        label = document.createElement('label');
        labelDiv.appendChild(label);
        row.insertBefore(labelDiv, row.firstChild);
      }
      label.textContent = `المادة رقم ${idx + 1}`;
      label.className = 'subject-label d-block text-center py-2 mb-2';
    });
  }
  // زر إضافة مادة
  const addBtn = document.getElementById('add-subject-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      const container = document.getElementById('subjects-container');
      const currentRows = container.querySelectorAll('.subject-row').length;
      if (currentRows >= maxSubjects) {
        Swal.fire('لا يمكن إضافة أكثر من 8 مواد.');
        return;
      }
      const row = document.createElement('div');
      row.className = 'row subject-row mb-2';
      row.innerHTML = `
        <div class=\"col-12 mb-1\">
          <label class=\"subject-label d-block text-center py-2 mb-2\"></label>
        </div>
        <div class=\"col-12 mb-1\">
          <input class=\"form-control mb-2 text-center big-input\" name=\"subjectName\" placeholder=\"اسم المادة [اختياري]\" type=\"text\">
        </div>
        <div class=\"col-md-6\">
          <input class=\"form-control mb-2 big-input\" autocomplete='off' name=\"courseHours\" placeholder=\"ساعات المادة\" type=\"number\" min=\"1\" max=\"20\">
        </div>
        <div class=\"col-md-6\">
          <input class=\"form-control mb-2 big-input\" autocomplete='off' name=\"courseScore\" placeholder=\"درجتك في المادة\" type=\"number\" min=\"0\" max=\"100\">
        </div>
        <div class=\"col-md-12 d-flex align-items-center big-input\">
          <button type=\"button\" class=\"btn btn-danger btn-md remove-btn-medium remove-subject-btn big-input w-100\" title=\"حذف المادة\">حذف المادة -</button>
        </div>
      `;
      container.appendChild(row);
      updateSubjectLabels();
    });
    // حذف مادة
    document.getElementById('subjects-container').addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-subject-btn')) {
        e.target.closest('.subject-row').remove();
        updateSubjectLabels();
      }
    });
    updateSubjectLabels();
  }

  // إضافة وإزالة الفصول ديناميكيًا
  const maxTerms = 4;
  const termsContainer = document.getElementById('terms-container');
  const addTermBtn = document.getElementById('add-term-btn');
  function updateTermLabels() {
    const rows = termsContainer.querySelectorAll('.term-row');
    rows.forEach((row, idx) => {
      let label = row.querySelector('label');
      if (!label) {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'col-12 mb-1';
        label = document.createElement('label');
        labelDiv.appendChild(label);
        row.insertBefore(labelDiv, row.firstChild);
      }
      label.textContent = `الفصل رقم ${idx + 1}`;
      label.className = 'term-label d-block text-center py-2 mb-2';
    });
  }
  if (addTermBtn) {
    addTermBtn.addEventListener('click', function() {
      const currentRows = termsContainer.querySelectorAll('.term-row').length;
      if (currentRows >= maxTerms) {
        Swal.fire('لا يمكن إضافة أكثر من 4 فصول.');
        return;
      }
      const row = document.createElement('div');
      row.className = 'row term-row mb-2';
      row.innerHTML = `
        <div class="col-12 mb-1">
          <label class="font-weight-bold"></label>
        </div>
        <div class="col-md-6">
          <input class="form-control big-input mb-2" autocomplete='off' name="termHours" placeholder="ساعات الفصل" type="number" min="1" max="50">
        </div>
        <div class="col-md-6">
          <input class="form-control big-input mb-2" autocomplete='off' name="termGpa" placeholder="معدل الفصل" type="number" min="0" max="4" step="0.01">
        </div>
        <div class="col-md-6">
          <select class="form-control mb-2 big-input" name="termType">
            <option value="normal">عادي</option>
            <option value="summer">صيفي</option>
          </select>
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <button type="button" class="btn btn-danger btn-sm remove-term-btn big-input w-100" title="حذف الفصل">حذف الفصل -</button>
        </div>
      `;
      termsContainer.appendChild(row);
      updateTermLabels();
    });
    termsContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-term-btn')) {
        e.target.closest('.term-row').remove();
        updateTermLabels();
      }
    });
    updateTermLabels();
  }
});
