$(document).ready(function () {
    var url = window.location.href;
    $('.sidebar .nav-item').find('.active').removeClass("active");
    $('.sidebar .nav-item .nav-link').each(function () {
        let href = this.href;
        if (href == url) {
            /*if (url == $(this).attr("href")) {
                $(this).parent().children().addClass('active');
            }*/
            $(this).parent().children().addClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().parent().addClass('menu-open');
            $(this).parent().parent().parent().children("a").addClass('active');
        }
    });
});

$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName);
});
$("#sl_category").change(function () {
    if ($('#sl_category').val() == "0") {
        $("#sl_subCategory").html('');
    }
    else {
        $.ajax({
            type: "post",
            url: "/AdminContent/getAllSubCategory",
            data: { cateId: $('#sl_category').val() },
            success: function (response) {
                $("#sl_subCategory").html('');
                response.forEach(function (row) {
                    $("#sl_subCategory").append(`<option value=${row.id}>${row.subCateName}</option>`);
                });
            }
        });
    }
});

function createCategory() {
    if ($('#sl_category').val() == "0") {
        $('#modalTitle').html('New Category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryName">Category Name</label>
                <input type="text" class="form-control" id="categoryName" name="cateName" placeholder="Enter name">
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/addNewCategory",
        });
    }
    else {
        let cateId = $('#sl_category').val();
        let cateName = $('#sl_category option:selected').text();
        $('#modalTitle').html('New Sub-Category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryTitle">Category Name</label>
                <input type="text" readonly class="form-control" id="subCategoryTitle" value="${cateName}">
                <input type="hidden" name="cateId" value="${cateId}">
            </div>
            <div class="form-group">
                <label for="subCategoryName">Sub-Category Name</label>
                <input type="text" class="form-control" id="subSategoryName" name="subCateName" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">Thumbnail</label>
                <div class="custom-file">
                    <input type="file" onChange="changeCustomChooseFile(this.value)" class="custom-file-input" id="imageFile" name="thumbnailSubCate">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/addNewSubCategory",
        });
    }
}

function updateCategory(cateId, cateName, subCateId, subCateName) {
    if ($('#sl_category').val() == "0" && $('#sl_subCategory').val() == undefined) {
        $('#modalTitle').html('Update Category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryName">Category Name</label>
                <input type="text" class="form-control" id="categoryName" name="cateName" placeholder="Enter name" value="${cateName}">
                <input type="hidden" name="cateId" value="${cateId}" >
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/updateCategory",
        });
    }
    else {
        $('#modalTitle').html('Update Sub-Category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryTitle">Category Name</label>
                <input type="text" readonly class="form-control" id="subCategoryTitle" value="${cateName}">
                <input type="hidden" name="subCateId" value="${subCateId}" >
                <input type="hidden" name="cateId" value="${cateId}">
            </div>
            <div class="form-group">
                <label for="subCategoryName">Sub-Category Name</label>
                <input type="text" class="form-control" id="subSategoryName" name="subCateName" placeholder="Enter name" value="${subCateName}">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">Thumbnail</label>
                <div class="custom-file">
                    <input type="file" onChange="changeCustomChooseFile(this.value)" class="custom-file-input" id="imageFile" name="thumbnailSubCate">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/updateSubCategory",
        });
    }
}

function deleteCategory(cateId, cateName, subCateId, subCateName) {
    if (subCateId == '') {
        $('#modalTitle').html('Confirm delete category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryName">Delete [${cateName}]?</label>
                <input type="hidden" name="cateId" value="${cateId}" >
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="submit" class="btn btn-primary">Yes</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/deleteCategory",
        });
    }
    else {
        $('#modalTitle').html('Confirm delete sub-category');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryTitle">Delete [${subCateName}]?</label>
                <input type="hidden" name="subCateId" value="${subCateId}" >
                <input type="hidden" name="cateId" value="${cateId}">
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="submit" class="btn btn-primary">Yes</button>
        `);
        $('#formCategory').attr({
            method: "post",
            action: "/AdminContent/deleteSubCategory",
        });
    }
}

$('#btnSortCategory').click(function () {
    $.ajax({
        type: "post",
        url: "/AdminContent/getCategoryResult",
        data: { cateId: $('#sl_category').val() },
        success: function (response) {
            if (response.errorCode == 0) {

                if ($("#sl_category").val() == "0") {
                    let tbody = ``;
                    response.data.forEach(function (row) {
                        tbody += `
                                <tr>
                                    <td class="text-center">${row.id}</td>
                                    <td>${row.cateName}</td>
                                    <td class="text-center">
                                        <button onclick="updateCategory('${row.id}','${row.cateName}','','')" class="btn btn-outline-info" data-toggle="modal" data-target="#modelId"><i class="fa fa-pencil-alt"></i></button>
                                        <button onclick="deleteCategory('${row.id}','${row.cateName}','','')" class="btn btn-outline-danger" data-toggle="modal" data-target="#modelId"><i class="fa fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                        `;
                    });
                    $("#tbl_categoryResult").html(`
                            <thead class="text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>${tbody}</tbody>`);
                }
                else {
                    let tbody = ``;
                    response.data.forEach(function (row) {
                        tbody += `
                                <tr>
                                    <td class="text-center">${row.id}</td>
                                    <td>${row.subCateName}</td>
                                    <td class="text-center"><img src="/images/${row.pathThumbnail}" alt="${row.subCateName}" class="img-thumbnail post-thumbnail-admin"></td>
                                    <td class="text-center">
                                        <button onclick="updateCategory('${row.category.id}','${row.category.cateName}','${row.id}','${row.subCateName}')" class="btn btn-outline-info" data-toggle="modal" data-target="#modelId"><i class="fa fa-pencil-alt"></i></button>
                                        <button onclick="deleteCategory('${row.category.id}','${row.category.cateName}','${row.id}','${row.subCateName}')" class="btn btn-outline-danger" data-toggle="modal" data-target="#modelId"><i class="fa fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                        `;
                    });
                    $("#tbl_categoryResult").html(`
                            <thead class="text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>Sub-Category Name</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>${tbody}</tbody>`);
                }
            }
        },
    });
});

//****************************
//start post
function addNewPost() {
    if ($('#sl_category').val() == '0' || $('#sl_subCategory').val() == '0' || $('#sl_subCategory').val() == undefined) {
        $('#modelId').hide();
        $('#toastTitle').html('Message');
        $('#toastBody').html('You must select sub-category');
        $('.toast').toast('show')
        return;
    }
    else {
        let cateId = $('#sl_category').val();
        let subCateId = $('#sl_subCategory').val();
        let cateName = $('#sl_category option:selected').text();
        let cateSubName = $('#sl_subCategory option:selected').text();
        $('.toast').toast('hide')
        $('#modelId').modal("show");
        $('#modalTitle').html('Create Post');
        $('#modalBody').html(`
            <div class="form-group">
                <label for="categoryName">Category Name</label>
                <input type="text" readonly class="form-control" value="${cateName}">
            </div>
            <div class="form-group">
                <label for="subCategoryName">Sub-Category Name</label>
                <input type="text" readonly class="form-control" value="${cateSubName}">
                <input type="hidden" name ="subCateId" value="${subCateId}" >
            </div>
            <div class="form-group">
                <label for="postTitle">Title</label>
                <input type="text" class="form-control" name="postTitle" placeholder="Enter title">
            </div>
            <div class="form-group">
                <label for="summaryContent">Summary content</label>
                <input type="text" class="form-control" name="summaryContent" placeholder="Enter summary content">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">Thumbnail</label>
                <div class="custom-file">
                    <input type="file" onChange="changeCustomChooseFile(this.value)" class="custom-file-input" id="imageFile" name="pathThumbnail">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
            <div class="form-group">
                <label>Content Detail</label><br/>
                <label>More Images</label>
                <input type="file" onChange="addImgContentPost(this)" />
                <textarea name="detailContent" id="config_binh_luan" class="ckeditor"></textarea>
            </div>
        `);
        $('#modalFooter').html(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save</button>
        `);
        $('#formPost').attr({
            method: "post",
            action: "/AdminContent/addNewPost",
        });
        CKEDITOR.replace("config_binh_luan", { customConfig: 'config_binh_luan.js' });
    }
}

$('#btnSortPost').click(function () {
    let data;
    let url;
    let subCateId = $('#sl_subCategory').val();
    let cateId = $('#sl_category').val();
    if (subCateId != '0' && subCateId != undefined) {
        data = { subCateId: subCateId };
        url = '/AdminContent/sortPostBySubCategoryId';
    }
    else if (cateId != '0' && subCateId == '0') {
        data = { cateId: cateId };
        url = '/AdminContent/sortPostByCategoryId';
    }
    else {
        data = {};
        url = '/AdminContent/sortPost';
    }
    $.ajax({
        type: "post",
        url: url,
        data: data,
        success: function (response) {
            if (response.errorCode == 0) {
                $('#formBodyPost').html('');
                let tbody = '';
                response.data.forEach(function (row) {
                    tbody += `
                            <tr>
                                <td class="text-center">${row.id}</td>
                                <td><img src="/images/${row.pathThumbnail}" alt="${row.postTitle}" class="img-thumbnail post-thumbnail-admin"></td>
                                <td>${row.postTitle}</td>
                                <td>${row.summaryContent}</td>
                                <td>${row.subCategories.subCateName}</td>
                                <td>${row.user.fullName}</td>
                                <td>${new Date(row.dateCreate).toLocaleString('en-GB')}</td>
                                <td class="text-center">
                                    <button class="btn btn-outline-info" onclick="updatePost(${row.id})" data-toggle="modal" data-target="#modelId"><i class="fa fa-pencil-alt"></i></button>
                                    <button class="btn btn-outline-${row.status == 0 ? "danger" : "warning"}"><i class="fa ${row.status == 0 ? "fa-trash-alt" : "fa-eye-slash"}"></i></button>
                                </td>
                            </tr>
                        `;
                });
                $('#formHeadPost').html(`<tr><th>ID</th><th>Thumbnail</th><th>Title</th><th>Summary </th><th>Subcategory</th><th>User Create</th><th>Date</th><th></th></tr>`);
                $("#formBodyPost").html(tbody);
            }
        },
    });
});

function updatePost(postId) {
    $.ajax({
        type: "post",
        url: '/AdminContent/GetDetailPostById',
        data: { postId: postId },
        success: function (response) {
            $('#modalTitle').html('Update Post');
            $('#formPost').html(response);
            $('#formPost').attr({
                method: "post",
                action: "/AdminContent/updatePost",
            });
            CKEDITOR.replace("config_binh_luan", { customConfig: 'config_binh_luan.js' });
        },
    });
}

function changeCategoryUpdatePost(cateId, postSubCateId) {
    $.ajax({
        type: "post",
        url: '/AdminContent/getAllSubCategoryForUpdatePost',
        data: { cateId: cateId },
        async: false,
        success: function (response) {
            $('#sl_subCategoryForUpdatePost').html('');
            response.data.forEach(function (row) {
                $('#sl_subCategoryForUpdatePost').append(`<option value="${row.id}" ${postSubCateId == row.id ? "selected" : ""}>${row.subCateName}</option>`)
            });
        }
    });
}

function chechSubCateIdUpdatePost() {
    if ($('#sl_subCategoryForUpdatePost').val() == undefined) {
        $('#errorCheckSubCate').html("Please sub-category");
        return false;
    }
    return true;
}

function addImgContentPost(file) {
    let formData = new FormData();
    formData.append("file", file.files[0]);
    $.ajax({
        type: "post",
        url: '/AdminContent/addImgContentPost',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.errorCode == 0) {
                CKEDITOR.instances['config_binh_luan'].insertHtml(response.data.value);
            }
        }
    });
};