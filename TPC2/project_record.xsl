<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/project_record">
    <html>
        <head>
            <title>Project Record</title>
            <style>
                h1 {
                display: flex;
                justify-content: center;
                }
                li{
                margin: 10px;
                }
                .column {
                float: left;
                width: 50%;
                }
                
                /* Clear floats after the columns */
                .row:after {
                content: "";
                display: table;
                clear: both;
                }
            </style>
        </head>
        
        <body>
            <h1>Project Record</h1>
            
            <hr/>
            <div class="row">
            <xsl:for-each select="meta_data"> 
                <div class="column">
                <ul style="list-style-type:none;">
                    <li><b>KEY NAME: </b><xsl:value-of select="key_name"/></li>
                    <li><b>TITLE: </b><xsl:value-of select="title"/></li>
                    <li><b>SUBTITLE: </b><xsl:value-of select="subtitle"/></li>
                </ul>
                </div>
                <div class="column">
                <ul style="list-style-type:none;">
                    <li><b>BEGIN DATE: </b><xsl:value-of select="begin_date"/></li>
                    <li><b>END DATE: </b><xsl:value-of select="end_date"/></li>
                    <li><b>SUPERVISOR: </b><a href="{supervisor/@link}"> <xsl:value-of select="supervisor"/></a></li>
                </ul>
                </div>
            </xsl:for-each>
            </div>
            <hr/>
            
            <hr/>
            <h3>WorkTeam:</h3>
            <xsl:for-each select="workteam">
                <ol>
                    <li>
                        <b><xsl:value-of select="element/@id"/>: </b> <xsl:value-of select="element/name"/>
                        <ul>
                            <li> email: <xsl:value-of select="element/email"/></li>
                            <li> web page: <a href="{element/web_page}"><xsl:value-of select="element/web_page"/></a></li>
                            <li> git: <a href="{element/git}"><xsl:value-of select="element/git"/></a></li>
                        </ul>
                    </li>
                </ol>
            </xsl:for-each>
            <hr/>
            
            <hr/>
            <h3>Abstract</h3>
            <xsl:for-each select="abstract">
                <xsl:for-each select="p">
                    <ul style="list-style-type:none; list-style-position:inside; padding-left: 0;" >
                        <li> 
                            <xsl:value-of select="."/>
                        </li>
                    </ul>
                </xsl:for-each>
            </xsl:for-each>
            <hr/>
            
            <hr/>
            <h3>Deliverables</h3>
                <xsl:for-each select="deliverables">
                    <xsl:for-each select="link">
                        <ul>
                            <li><a href="{@link}"> <xsl:value-of select="."/></a></li>
                        </ul>
                    </xsl:for-each>
                </xsl:for-each>
                <hr/>
        </body>
    </html>
    </xsl:template>    
</xsl:stylesheet>