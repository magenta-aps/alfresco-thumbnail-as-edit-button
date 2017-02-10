"use strict";

if (Alfresco !== undefined && Alfresco.DocumentListTableViewRenderer !== undefined) {

    var $html = Alfresco.util.encodeHTML;
    /**
     * @see Alfresco.DocumentListViewRenderer.renderCellThumbnail
     */
    Alfresco.DocumentListTableViewRenderer.prototype.renderCellThumbnail = function DL_SVR_renderCellThumbnail(scope, elCell, oRecord, oColumn, oData)
    {
        var record = oRecord.getData(),
            node = record.jsNode,
            properties = node.properties,
            name = record.displayName,
            isContainer = node.isContainer,
            isLink = node.isLink,
            extn = name.substring(name.lastIndexOf(".")),
            imgId = node.nodeRef.nodeRef; // DD added

        var containerTarget; // This will only get set if thumbnail represents a container

        oColumn.width = 16;

        if (YAHOO.env.ua.ie > 0)
        {
            try
            {
                scope.widgets.dataTable._elThead.children[0].children[2].children[0].style.width = "16px";
            }
            catch (e)
            {
                // Deliberately swallowing any generated exceptions without remorse.
            }

        }

        Dom.setStyle(elCell, "width", oColumn.width + "px");
        Dom.setStyle(elCell.parentNode, "width", oColumn.width + "px");

        if (isContainer)
        {
            elCell.innerHTML = '<span class="folder-small">' + (isLink ? '<span class="link"></span>' : '') + (scope.dragAndDropEnabled ? '<span class="droppable"></span>' : '') + Alfresco.DocumentList.generateFileFolderLinkMarkup(scope, record) + '<img id="' + imgId + '" src="' + this.getFolderIcon(record.node) + '" /></a>';
        }
        else {
            var mimetype = node.mimetype;

            var MSOfficeFileTypes = [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-word.document.macroenabled.12",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                "application/vnd.ms-word.template.macroenabled.12",

                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "application/vnd.ms-powerpoint.presentation.macroenabled.12",
                "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
                "application/vnd.openxmlformats-officedocument.presentationml.template",
                "application/vnd.ms-powerpoint.template.macroenabled.12",
                "application/vnd.ms-powerpoint.addin.macroenabled.12",
                "application/vnd.openxmlformats-officedocument.presentationml.slide",
                "application/vnd.ms-powerpoint.slide.macroEnabled.12",

                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                "application/vnd.ms-excel.sheet.macroenabled.12",
                "application/vnd.ms-excel.template.macroenabled.12",
                "application/vnd.ms-excel.addin.macroenabled.12",
                "application/vnd.ms-excel.sheet.binary.macroenabled.12",
                "application/vnd.visio",
                "application/vnd.visio2013",
                "application/vnd.ms-project"
            ];

            var LibreOfficeFileTypes = [
                "application/vnd.sun.xml.writer",
                "application/vnd.sun.xml.writer.template",
                "application/vnd.sun.xml.writer.global",
                "application/vnd.stardivision.writer sdw",
                "application/vnd.stardivision.writer-global",
                "application/vnd.sun.xml.calc",
                "application/vnd.sun.xml.calc.template",
                "application/vnd.stardivision.calc",
                "application/vnd.sun.xml.impress",
                "application/vnd.sun.xml.impress.template",
                "application/vnd.stardivision.impress",
                "application/vnd.sun.xml.draw",
                "application/vnd.sun.xml.draw.template",
                "application/vnd.stardivision.draw",
                "application/vnd.sun.xml.math",
                "application/vnd.stardivision.math",
                "application/vnd.oasis.opendocument.text",
                "application/vnd.oasis.opendocument.text-template",
                "application/vnd.oasis.opendocument.text-web",
                "application/vnd.oasis.opendocument.text-master",
                "application/vnd.oasis.opendocument.graphics",
                "application/vnd.oasis.opendocument.graphics-template",
                "application/vnd.oasis.opendocument.presentation",
                "application/vnd.oasis.opendocument.presentation-template",
                "application/vnd.oasis.opendocument.spreadsheet",
                "application/vnd.oasis.opendocument.spreadsheet-template",
                "application/vnd.oasis.opendocument.chart",
                "application/vnd.oasis.opendocument.formula",
                "application/vnd.oasis.opendocument.database",
                "application/vnd.oasis.opendocument.image"
            ];

            if (MSOfficeFileTypes.indexOf(mimetype) != -1) {
                elCell.innerHTML = '<div class="document-edit-online-aos" id="onActionEditOnlineAos"><a title="Rediger online" class="action-link" href="#" style="background-image:url(/share/res/components/documentlibrary/actions/document-edit-online-16.png)"></a></div>';
            }
            else if (LibreOfficeFileTypes.indexOf(mimetype) != -1) {
                elCell.innerHTML = '<div class="document-edit-online-libreoffice" id="onActionEditOnlineLibreOffice"><a title="Rediger online" class="action-link" href="#" style="background-image:url(/share/res/components/documentlibrary/actions/document-edit-online-16.png)"></a></div>';
            }
        }
    };
}