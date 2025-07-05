function getVall() {
    // اجلب القيم من الحقول
    const hours = Array.from(document.getElementsByName('termHours')).map(input => Number(input.value) || 0);
    const gpas = Array.from(document.getElementsByName('termGpa')).map(input => Number(input.value) || 0);
    const termNames = Array.from(document.getElementsByName('termName')).map(input => input.value.trim());
    let invalidInput = false;
    for (let i = 0; i < hours.length; i++) {
        let hour = hours[i];
        let gpa = gpas[i];
        if ((hour > 0 && gpa === 0) || (gpa > 0 && hour === 0)) {
            Swal.fire(`يجب إدخال كل من الساعات والمعدل للفصل رقم ${i+1}`);
            invalidInput = true;
            break;
        }
        if (gpa > 4) {
            Swal.fire(`معدل الفصل رقم ${i+1} يجب ألا يزيد عن 4.0.`);
            invalidInput = true;
            break;
        }
        if (hour > 50) {
            Swal.fire(`ساعات الفصل رقم ${i+1} يجب ألا تزيد عن 50.`);
            invalidInput = true;
            break;
        }
        if (gpa < 0) {
            Swal.fire(`معدل الفصل رقم ${i+1} يجب ألا يقل عن 0.`);
            invalidInput = true;
            break;
        }
        if (hour < 1 && (hour > 0 || gpa > 0)) {
            Swal.fire(`ساعات الفصل رقم ${i+1} يجب أن تكون 1 على الأقل.`);
            invalidInput = true;
            break;
        }
    }
    if (invalidInput) return;
    // تحقق من وجود بيانات صالحة
    const validTerms = hours.filter((h, i) => h > 0 && gpas[i] > 0);
    if (validTerms.length === 0) {
        Swal.fire('يرجى إدخال ساعات ومعدل فصل واحد على الأقل لحساب المعدل التراكمي');
        return;
    }
    // احسب مجموع الساعات
    const totalHours = hours.reduce((sum, h) => sum + h, 0);
    // احسب مجموع (المعدل * الساعات) لكل فصل
    const weightedSum = hours.reduce((sum, h, i) => sum + h * gpas[i], 0);
    if (totalHours === 0) {
        Swal.fire('يرجى إدخال ساعات ومعدلات الفصول لحساب المعدل التراكمي');
        return;
    }
    // احسب المعدل التراكمي
    let finalGpa = weightedSum / totalHours;
    finalGpa = Math.max(0, Math.min(finalGpa, 4));
    // احسب النسبة المئوية (معدل 4 = 100%)
    const percent = (finalGpa / 4) * 100;
    // احسب التقدير النهائي
    let letterGrade = '';
    if (finalGpa >= 3.7 && finalGpa <= 4) {
        letterGrade = 'A+ ممتاز مرتفع';
    } else if (finalGpa >= 3.4 && finalGpa < 3.7) {
        letterGrade = 'A ممتاز';
    } else if (finalGpa >= 3.1 && finalGpa < 3.4) {
        letterGrade = 'A- ممتاز منخفض';
    } else if (finalGpa >= 2.8 && finalGpa < 3.1) {
        letterGrade = 'B+ جيد جدا مرتفع';
    } else if (finalGpa >= 2.5 && finalGpa < 2.8) {
        letterGrade = 'B جيد جدا';
    } else if (finalGpa >= 2.2 && finalGpa < 2.5) {
        letterGrade = 'C+ جيد مرتفع';
    } else if (finalGpa >= 1.9 && finalGpa < 2.2) {
        letterGrade = 'C جيد';
    } else if (finalGpa >= 1.6 && finalGpa < 1.9) {
        letterGrade = 'D+ مقبول مرتفع';
    } else if (finalGpa >= 1.3 && finalGpa < 1.6) {
        letterGrade = 'D مقبول';
    } else if (finalGpa >= 1 && finalGpa < 1.3) {
        letterGrade = 'D- مقبول منخفض';
    } else if (finalGpa < 1) {
        letterGrade = 'F راسب';
    } else {
        letterGrade = 'غير متوفر';
    }
    // راسب في أي فصل؟
    let failTerms = [];
    gpas.forEach((g, i) => {
        if (hours[i] > 0 && g > 0 && g < 2.0) failTerms.push(i);
    });
    let failMsg = '';
    if (failTerms.length > 0) {
        failMsg = '<hr>' + failTerms.map(idx => {
            const name = termNames[idx] ? `(${termNames[idx]})` : '';
            return `<div style=\"color:#c00;font-weight:bold;direction:rtl;\">الفصل رقم ${idx+1} ${name}: قد تعتبر راسباً به.</div>`;
        }).join('');
    }
    Swal.fire({
      html: `
        <div style=\"direction: rtl; font-size: 1.2em;\">
          <b>المعدل التراكمي:</b> ${finalGpa.toFixed(2)}<br>
          <b>مجموع الساعات:</b> ${totalHours} <br>
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

// إضافة وإزالة الفصول ديناميكيًا مع تحديث الترقيم
const maxTerms = 8;
function updateTermLabels() {
  const rows = document.querySelectorAll('#terms-container .term-row');
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
    // Hide remove button for first row, show for others
    const removeBtn = row.querySelector('.remove-term-btn');
    if (removeBtn) {
      if (idx === 0) {
        removeBtn.style.display = 'none';
      } else {
        removeBtn.style.display = '';
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('add-term-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      const container = document.getElementById('terms-container');
      const currentRows = container.querySelectorAll('.term-row').length;
      if (currentRows >= maxTerms) {
        Swal.fire('لا يمكن إضافة أكثر من 8 فصول.');
        return;
      }
      const row = document.createElement('div');
      row.className = 'row term-row mb-3';
      row.innerHTML = `
        <div class=\"col-12 mb-1\">
          <label class=\"term-label d-block text-center py-2 mb-2\"></label>
        </div>
        <div class=\"col-12 mb-1\">
          <input class=\"form-control mb-2 text-center big-input\" name=\"termName\" placeholder=\"اسم الفصل [اختياري]\" type=\"text\">
        </div>
        <div class=\"col-md-6 mb-1\">
          <input class=\"form-control mb-2 big-input\" autocomplete='off' name=\"termHours\" placeholder=\"ساعات الفصل\" type=\"number\" min=\"1\" max=\"50\">
        </div>
        <div class=\"col-md-6 mb-1\">
          <input class=\"form-control mb-2 big-input\" autocomplete='off' name=\"termGpa\" placeholder=\"معدل الفصل\" type=\"number\" min=\"0\" max=\"4\" step=\"0.01\">
        </div>
        <div class=\"col-md-12 d-flex align-items-center \">
          <button type=\"button\" class=\"btn btn-danger btn-md remove-btn-medium w-100 big-input remove-term-btn\" title=\"حذف الفصل\">حذف الفصل -</button>
        </div>
      `;
      container.appendChild(row);
      updateTermLabels();
    });
    document.getElementById('terms-container').addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-term-btn')) {
        e.target.closest('.term-row').remove();
        updateTermLabels();
      }
    });
    updateTermLabels();
  }
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      getVall();
    });
  }
});
