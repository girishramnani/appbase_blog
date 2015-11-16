
// thinking of storing comments lazily in the relations
var Post = function(title,subtitle){
  this.title = title;
  this.subtitle = subtitle;
  this.relations = [];

};

Post.prototype.addContent=function(content){

  this.content = content;

};

Post.prototype.toJson = function(){
  self = this;
  return {
    title:self.title,
    subtitle:self.subtitle,
    content:self.content,
    createdOn:Date()
  };
};
module.exports = {
  Post:Post
};
