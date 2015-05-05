namespace SurveyTool.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SurveysCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Surveys",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(),
                    StartDate = c.DateTime(nullable: false),
                    EndDate = c.DateTime(nullable: false),
                })
                .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.Questions",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    SurveyId = c.Int(nullable: false),
                    Title = c.String(),
                    Type = c.String(),
                    Body = c.String(),
                    Priority = c.Int(nullable: false),
                    IsActive = c.Boolean(nullable: false),
                    CreatedOn = c.DateTime(nullable: false),
                    ModifiedOn = c.DateTime(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Surveys", t => t.SurveyId, cascadeDelete: true)
                .Index(t => t.SurveyId);

            CreateTable(
                "dbo.Answers",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    ResponseId = c.Int(nullable: false),
                    QuestionId = c.Int(nullable: false),
                    Value = c.String(),
                    Comment = c.String(),
                    Question_Id = c.Int(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Responses", t => t.ResponseId, cascadeDelete: true)
                .ForeignKey("dbo.Questions", t => t.QuestionId)
                .ForeignKey("dbo.Questions", t => t.Question_Id)
                .Index(t => t.ResponseId)
                .Index(t => t.QuestionId)
                .Index(t => t.Question_Id);

            CreateTable(
                "dbo.Responses",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    SurveyId = c.Int(nullable: false),
                    CreatedBy = c.String(),
                    CreatedOn = c.DateTime(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Surveys", t => t.SurveyId, cascadeDelete: true)
                .Index(t => t.SurveyId);
        }

        public override void Down()
        {
            DropForeignKey("dbo.Responses", "SurveyId", "dbo.Surveys");
            DropForeignKey("dbo.Answers", "Question_Id", "dbo.Questions");
            DropForeignKey("dbo.Answers", "QuestionId", "dbo.Questions");
            DropForeignKey("dbo.Answers", "ResponseId", "dbo.Responses");
            DropForeignKey("dbo.Questions", "SurveyId", "dbo.Surveys");
            DropIndex("dbo.Responses", new[] { "SurveyId" });
            DropIndex("dbo.Answers", new[] { "Question_Id" });
            DropIndex("dbo.Answers", new[] { "QuestionId" });
            DropIndex("dbo.Answers", new[] { "ResponseId" });
            DropIndex("dbo.Questions", new[] { "SurveyId" });
            DropTable("dbo.Responses");
            DropTable("dbo.Answers");
            DropTable("dbo.Questions");
            DropTable("dbo.Surveys");
        }
    }
}
