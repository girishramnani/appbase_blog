
// thinking of storing comments lazily in the relations
var Post = function(title,subtitle){
  this.title = title;
  this.subtitle = subtitle;
  this.relations = [];

};

Post.prototype.addContent=function(content_id){

  this.content_id = content_id;

};

Post.prototype.toJson = function(){
  self = this;
  return {
    title:self.title,
    subtitle:self.subtitle,
    content_id:self.content_id,
    createdOn:Date()
  };
};
module.exports = {
  Post:Post
};
